export const getIpAddress = (req, res, next) => {
    const getIPUser = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if(getIPUser.includes('127.0.0.1')){
        return res.status(400).json({msg: 'You are not allowed'});
    }
    req.getIPUser = getIPUser;
    next();
}