const jwt = require('jsonwebtoken');
const { User } = require('../model/user');


const isAuth = async (req , res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        if(decode) {
         const user = await User.findById(decode.id)
        if(decode.email && decode.email == user.email) {
            req.user = user;
            next()
        }
        return res.status(401).json({ message: 'Email mismatch' });
        }
        return res.status(401).json({ message: 'Failed to decode' });
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    isAuth
}