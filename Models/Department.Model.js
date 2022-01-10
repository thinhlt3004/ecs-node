import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    DepartmentName:{
        type: String, 
        required: true, 
        unique: true, 
    },
    Description:{
        type: String, 
        required: true
    }
},{
    timestamps: true
});

const DepartmentModel = mongoose.model('Department', DepartmentSchema);
export default DepartmentModel;