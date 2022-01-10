import mongoose from 'mongoose';

const ServiceCustomerSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    serviceId:{
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate:{
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    employeeHandler: [
        {
            employeeId: {
                type: mongoose.Types.ObjectId,
                ref: 'Account',
            },
            startDate:{
                type: Date,
            }
        }
    ],
    productName: {
        type: String,
        required: true,
    },
    productPrice:{
        type: Number,
        required: true,
    }
},{
    timestamps: true,
});


const ServiceCustomerModel = mongoose.model('ServiceCustomer', ServiceCustomerSchema);
export default ServiceCustomerModel;