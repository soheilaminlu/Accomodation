const {User} = require('../model/user');
const jwt = require('jsonwebtoken');



const isAdmin = async(req , res , next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const decode  = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
    if(decode) {
     const user = await User.findById(decode.id);
     if(user._id === 'admin') {
        return next()
     }
     return res.status(401).json({message:"Unauthorized User"});
    }
}


module.exports = {
    isAdmin
}