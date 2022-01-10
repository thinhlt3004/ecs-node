import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    serviceOfCustomer: {
        type: mongoose.Types.ObjectId,
        ref: 'ServiceCustomer',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
})

const ReportModel = mongoose.model('Report', ReportSchema);
export default ReportModel;