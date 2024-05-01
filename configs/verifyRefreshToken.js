const UserToken = require('../model/userToken');
const jwt = require('jsonwebtoken');


const verifyRefreshToken = (refreshToken) => {
   const secretKey = process.env.REFRESH_TOKEN_SECRET
   return new Promise((resolve , reject) => {
    UserToken.findOne({token:refreshToken} ,(error , doc) => {
     if(!doc) {
        return reject({error:true , message:"Invalid Token"})
     }
     jwt.verify(refreshToken , secretKey , (error , decode) => {
        if(error) {
            return reject({error:true , message:"Invalid Token"})
        }
        const newAccessToken = jwt.sign(
            decode,
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'}
        );
        resolve({
            error:false , 
            decode , 
            newAccessToken , 
            message:"Valid refresh token "
        })
     })
    })
   }) 
}

module.exports = {
    verifyRefreshToken
}