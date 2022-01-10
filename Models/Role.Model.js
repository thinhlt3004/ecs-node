import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    RoleName:{
        type: String, 
        required: true, 
    }
},{
    timestamps: true
});

const RoleModel = mongoose.model('Role', RoleSchema);
export default RoleModel;