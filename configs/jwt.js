const jwt = require('jsonwebtoken');

const generateAccessToken = (id , email , role) => {
jwt.sign({id , email , role} , process.env.ACCESS_TOKEN_SECRET , {expiresIn:'15m'})
}


const generateRefreshToken = (id) => {
    jwt.sign({id} , process.env.REFRESH_TOKEN_SECRET)
}


const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}


module.exports = {
    generateAccessToken , 
    generateRefreshToken , 
    verifyToken
}