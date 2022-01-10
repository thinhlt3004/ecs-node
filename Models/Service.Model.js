import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
},{
    timestamps: true
});


const ServiceModel = mongoose.model('Service', ServiceSchema);
export default ServiceModel;