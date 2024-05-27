const jwt = require('jsonwebtoken');
const  {User}  = require('../model/user');


const isAuth = async (req , res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        if(!decode) {
           return res.status(400).json({message:"Failed to decode"})
        }
        console.log(decode)
        console.log(decode.userId)
        const user = User.findById(decode.userId);
        if(!user) {
            return res.status(404).json({message:"User not Found"})
             }
            req.user = user
        return next();   
    
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    isAuth
}