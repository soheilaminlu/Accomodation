const {User} = require('../model/user');
const jwt = require('jsonwebtoken');



const isAdmin = async(req , res , next) => {
if (req.user && req.user.role === 'admin') {
    return next();
}
return res.status(400).json({message:"Access Denied you are not an Admin"})
}


module.exports = {
    isAdmin
}