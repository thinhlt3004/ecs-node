import RoleModel from './../Models/Role.Model.js';

export const isAdmin = async (req, res, next) => {
    try {
        const role = await RoleModel.findById(req.user.role);
        if(role.RoleName === "Admin"){
            next();
        }else{
            return res.status(405).json('Method not allow');
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}