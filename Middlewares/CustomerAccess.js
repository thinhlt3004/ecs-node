import RoleModel from './../Models/Role.Model.js';

export const isCustomer = async (req, res, next) => {
    try {
        const role = await RoleModel.findById(req.user.role);
        if(role.RoleName === "Customer"){
            next();
        }else{
            return res.status(405).json('Method not allow');
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}