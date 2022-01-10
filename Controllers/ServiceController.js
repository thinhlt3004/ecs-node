import ServiceModel from "./../Models/Service.Model.js";
import ServiceCustomerModel from './../Models/ServiceCustomer.Model.js';
import { asyncWrapper } from "./../Helpers/AsyncWrapper.js";
import client from "./../Helpers/InitialRedis.js";
import mongoose from 'mongoose';
class ServiceController {
  getAll = asyncWrapper(async (req, res) => {
    const serviceString = await client.get("allproduct");
    if (serviceString !== null) {
      res.status(200).json(JSON.parse(serviceString));
    } else {
      const services = await ServiceModel.find({});
      await client.setEx("allProduct", 3600, JSON.stringify(services));
      return res.status(200).json(services);
    }
  });

  create = asyncWrapper(async (req, res) => {
    const service = new ServiceModel(req.body);
    const newService = await service.save();
    return res.status(200).json(newService);
  });

  getByID = asyncWrapper(async (req, res) => {
    const service = await ServiceModel.findById(req.params.id);
    if (service) {
      return res.status(200).json(service);
    } else {
      return res.status(404).json("Not Found");
    }
  });

  getByCategory = asyncWrapper(async (req, res) => {
    const services = await ServiceModel.find({ category: req.params.id });
    return res.status(200).json(services);
  });

  update = asyncWrapper(async (req, res) => {
    const updated = await ServiceModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(updated);
  });

  getAllAggregations = asyncWrapper(async (req, res) => {

    //=> Get By ObjectId
    // const services = await ServiceModel.aggregate([
    //   { $match: { "_id" : mongoose.Types.ObjectId('61d942ecb1a7ce4aeaba1f56') } }, //$gte : greater than  => condition    
    // ]);
    //=> Get Limit 1
    // const services = await ServiceModel.aggregate([
    //    {$limit : 1} 
    // ]);
    //=> Get All
    // const services = await ServiceModel.aggregate([
    //     {
    //         $project: {
    //             name : 1, description: 1, price: 1, category: 1
    //         }
    //     }
    // ])
    //Match Count - Group => total Price of Customer 
    const services = await ServiceCustomerModel.aggregate([
        {
            $match : { "customerId": mongoose.Types.ObjectId(req.params.id) },
        },
        {
            $group : { _id : "$customerId", total: {$sum : '$totalPrice'}}
        }
    ]);
    //=> Match Count 
    // const services = await ServiceCustomerModel.aggregate([
    //     {
    //         $match : { "customerId": mongoose.Types.ObjectId('61d91ff4677b0022adb97440') },
    //     },
    //     {
    //         $group : { _id : "$customerId", total: {$sum : 1}}
    //     }
    // ]);
    // const services = await ServiceModel.find({});
    return res.status(200).json(services);
  });
}

export default new ServiceController();
