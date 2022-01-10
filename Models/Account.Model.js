import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AccountSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    emailConfirm:{
        type: Boolean,
        default: false,
    },
    roleId: {
        type: mongoose.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    departmentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    image:{
        type: String, 
        required: true,
    },
    confirmToken: {
        type: String,
    }
},{
    timestamps: true
});


AccountSchema.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')) user.password = bcrypt.hashSync(user.password, 8);
});


AccountSchema.statics.FindByCredentials = async function (email, password) {
    
    try {
      const user = await AccountModel.findOne({email: email});
      if(!user) throw new Error('Invalid email');
    // compare or compareSync
      const isMatch = await bcrypt.compareSync(password, user.password);
      if(!isMatch) throw new Error('Invalid password');
  
      return user;
    } catch (error) {
        throw new Error(error);
    }
};

const AccountModel = mongoose.model('Account', AccountSchema);
export default AccountModel;