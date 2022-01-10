import RoleModel from './../Models/Role.Model.js';

export const isEmployee = async (req, res, next) => {
    try {
        const role = await RoleModel.findById(req.user.role);
        if(role.RoleName === "Admin" || role.RoleName === "Employee"){
            next();
        }else{
            return res.status(405).json('Method not allow');
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}