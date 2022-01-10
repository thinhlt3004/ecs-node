import { asyncWrapper } from '../Helpers/AsyncWrapper.js';
import DepartmentModel from './../Models/Department.Model.js';
import mongoose from 'mongoose';

class DepartmentController {
    create = asyncWrapper(async (req, res) => {
        const newDepartment = new DepartmentModel(req.body);
        const depart = await newDepartment.save();
        return res.status(200).json(depart);
    });

    getAll = asyncWrapper(async (req, res) => {
        const departments = await DepartmentModel.find({});
        return res.status(200).json(departments);
    });

    getById = asyncWrapper(async (req, res) => {
        const department = await DepartmentModel.aggregate([
            { $match: { '_id' : mongoose.Types.ObjectId(req.params.id) } },
        ]);

        return res.status(200).json(department);
    });

    update = asyncWrapper(async (req, res) => {
        const updaded = await DepartmentModel.findOneAndUpdate({_id : req.params.id}, req.body, {new : true});
        return res.status(200).json(updaded);
    });
}

export default new DepartmentController();