const jwt = require('jsonwebtoken');
const UserToken = require('../model/userToken')

const generateTokens = async (user) => {
    const payload = {
        userId: user._id,
        role: user.role // Assuming role is a property of the user object
    };
try {
    const accessToken = jwt.sign(
     payload , 
    process.env.ACCESS_TOKEN_SECRET, 
     {expiresIn:'60m'}
    );
    const refreshToken = jwt.sign (
    payload , 
    process.env.REFRESH_TOKEN_SECRET ,
    {expiresIn:'10d'}
    );
    const existingUserToken = await UserToken.findOne({userId:user._id})

    if (existingUserToken) {
        await UserToken.deleteOne({ userId: user._id });
    }

    await new UserToken({userId:user._id , token:refreshToken}).save();
   return Promise.resolve({accessToken , refreshToken})
} catch(error) {
    return Promise.reject(error)
}
}


module.exports = {
  generateTokens
}