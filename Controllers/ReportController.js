import ReportModel from '../Models/Report.Model.js';
import ServiceCustomerModel from './../Models/ServiceCustomer.Model.js';
import ServiceModel from './../Models/Service.Model.js';
import {asyncWrapper} from './../Helpers/AsyncWrapper.js';
import client from './../Helpers/InitialRedis.js';
import pdf from 'html-pdf';
import fs from 'fs';
import mime from 'mime';
import ExcelJS from 'exceljs';
import path from 'path';

class ReportController {
    create = asyncWrapper(async (req, res) => {
        const serviceCustomer = await ServiceCustomerModel.findById(req.body.serviceOfCustomer);
        const service = await ServiceModel.findById(serviceCustomer.serviceId); 
        const totalPrice = parseInt(service.price) * req.body.count; 
        req.body.totalPrice = totalPrice;
        const newReport = new ReportModel(req.body);
        const report = await newReport.save();
        return res.status(200).json(report);
    });

    getAll = asyncWrapper(async (req, res) => {
        const serviceCusString = await client.get(`get-by-service-customer/${req.params.id}`);
        if(serviceCusString !== null) {
            return res.status(200).json(JSON.parse(serviceCusString));
        }
        const serviceCus = await ReportModel.find({serviceOfCustomer : req.params.id});
        await client.setEx(`get-by-service-customer/${req.params.id}`, 3600, JSON.stringify(serviceCus));
        return res.status(200).json(serviceCus);

    });


    getReportPDF = asyncWrapper(async (req, res) => {
        const options = {
            format: 'A4',
        }
        const report = await ReportModel.find({serviceOfCustomer : req.params.id});     
        const serviceCus = await ServiceCustomerModel.findById(req.params.id);
        const service =await ServiceModel.findById(serviceCus.serviceId); 
        res.render('demopdf', {data: report, service : service}, (error, html) => {
            pdf.create(html, options).toFile('./../public/uploads/demopdf.pdf', function(err, result) {
                if (err) return console.log(err);
                var datafile = fs.readFileSync('./../public/uploads/demopdf.pdf');
                res.header('content-type', 'application/pdf');
                res.send(datafile);
              });
        });
    });
    //PACKAGE ExcelJS
    getReportExcel = asyncWrapper(async (req, res) => {
        const __dirname = path.resolve();
        const report = await ReportModel.find({serviceOfCustomer : req.params.id});    
        //ReportModel.find({$gte: date, $lte: date}) => greater than and less than report
        const workbook = new ExcelJS.Workbook();
        const workSheet = workbook.addWorksheet('Report');
        workSheet.columns = [
            { header : 'ID', key: '_id', width: 10},
            { header : 'Date', key: 'date', width: 10},
            { header : 'Count', key: 'count', width: 10},
            { header : 'Total Price', key: 'totalPrice', width: 10}
        ];
        let count = 1;
        report.forEach(i => {
            workSheet.addRow(i);
            count++;
        })
        workSheet.getRow(1).eachCell((cell) => {
            cell.font = {bold: true};
        })

        const data = await workbook.xlsx.writeFile('ExcelReports/report.xlsx');
        const file = path.join(__dirname, 'ExcelReports', 'report.xlsx');
        // const fileName = path.basename(file);
        // const mimeType = mime.getType(file);
        // res.setHeader('Content-Diposition', 'attachment;filename=', fileName);
        // res.setHeader('Content-Type', mimeType);
        return res.download(file);
    });
    
    
}

export default new ReportController();