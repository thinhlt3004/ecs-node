import ServiceCustomerModel from './../Models/ServiceCustomer.Model.js';
import ServiceModel from '../Models/Service.Model.js';
import {asyncWrapper} from './../Helpers/AsyncWrapper.js';
import client from './../Helpers/InitialRedis.js';
import mongoose from 'mongoose';
class ServiceCustomer{
    create = asyncWrapper(async (req, res) => {
        var startDate = new Date(req.body.startDate);
        var endDate = new Date(req.body.endDate);
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
        const currentService = await ServiceModel.findById(req.body.serviceId);
        var totalPrice = parseInt(totalDays) * parseInt(currentService.price);
        req.body.employeeHandler = [];
        req.body.totalPrice = totalPrice;
        req.body.totalDays = totalDays;
        const newServiceCus = new ServiceCustomerModel(req.body);
        const serviceCus = await newServiceCus.save();
        return res.status(200).json(serviceCus);
    });


    addEmployee = asyncWrapper(async (req, res) => {
        const payload = {
            employeeId : req.body.employeeId,
            startDate : Date.now(),
        }
        const updated = await ServiceCustomerModel.findByIdAndUpdate({_id : req.params.id}, {$push: {employeeHandler : payload}}, {new : true});
        return res.status(200).json(updated);
    });


    getAll = asyncWrapper(async (req, res) => {
        const serCusString = await client.get('get-all-service-customer');
        if(serCusString !== null) {
            return res.status(200).json(JSON.parse(serCusString));
        }

        const serCus = await  ServiceCustomerModel.find({});

        await client.setEx('get-all-service-customer', 3600, JSON.stringify(serCus));
        return res.status(200).json(serCus);
    });


    getById = asyncWrapper(async (req, res) => {
        const serviceCus = await ServiceCustomerModel.aggregate([
            { $match: { '_id' : mongoose.Types.ObjectId(req.params.id) } },
            { $lookup: {
                    from : 'accounts',
                    localField: 'customerId',
                    foreignField: '_id',
                    as :'customerObject'
                },               
            },
            { $lookup: {
                    from : 'services',
                    localField: 'serviceId',
                    foreignField: '_id',
                    as : 'serviceObject'
                }
            }
        ])
        ;
        return res.status(200).json(serviceCus);
    });

    getAllIncluded = asyncWrapper(async (req, res) => {
        const serviceCus = await ServiceCustomerModel.aggregate([
            {
                $lookup: {
                    from : 'services',
                    localField: 'serviceId',
                    foreignField: '_id',
                    as : 'serviceObject'
                },
            },
            { $lookup: {
                from : 'accounts',
                localField: 'customerId',
                foreignField: '_id',
                as :'customerObject'
                },      
            }         
        ]);

        return res.status(200).json(serviceCus);
    })
}

export default new ServiceCustomer();