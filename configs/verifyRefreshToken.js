const UserToken = require('../model/userToken');
const jwt = require('jsonwebtoken');

const verifyRefreshToken = async (refreshToken) => {
    const secretKey = process.env.REFRESH_TOKEN_SECRET;
    try {
        const doc = await UserToken.findOne({ token: refreshToken });
        if (!doc) {
            throw { error: true, message: "Invalid Token" };
        }
        const decode = jwt.verify(refreshToken, secretKey);
        return {
            error: false,
            tokenDetails: decode // Passing decoded token details
        };
    } catch (error) {
        throw { error: true, message: "Invalid Token" };
    }
};


module.exports = {
    verifyRefreshToken
}