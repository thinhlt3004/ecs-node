import RoleModel from './../Models/Role.Model.js';
import {asyncWrapper} from './../Helpers/AsyncWrapper.js';
import mongoose from 'mongoose';
class RoleController{
    create =  asyncWrapper(async (req, res) => {
        const newRole = new RoleModel(req.body);
        const role = await newRole.save();
        return res.status(200).json(role);
    });

    getAll = asyncWrapper(async (req, res) => {
        const roles = await RoleModel.find({});
        return res.status(200).json(roles);
    });
    //Return Array with only one items
    getById = asyncWrapper(async (req, res) => {
        const role = await RoleModel.aggregate([
            { $match: { '_id': mongoose.Types.ObjectId(req.params.id) } },
        ]);
        return res.status(200).json(role);
    });
}

export default new RoleController();