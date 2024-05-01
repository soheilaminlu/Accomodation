const Joi = require('joi');
const bcrypt = require('bcrypt')
const {User , validateUser} = require('../model/user');
const {generateTokens} = require('../configs/jwt');
const UserToken = require('../model/userToken');
 const  {verifyRefreshToken}  = require('../configs/verifyRefreshToken')

module.exports.signupController = async (req, res) => {
    const {username , password , email , role} = req.body
    console.log(req.body)
   const {error} =  await validateUser(req.body);
   if(error) {
   return res.status(400).json({message:"Validation Failed" , error:error.message})
   }
   const existingUser = await User.findOne({email});
   if(existingUser) {
    return res.status(400).json({message:"Already Exist"})
   }
   const saltRound = 10
   const salt = await bcrypt.genSalt(saltRound)
   const hashhingPass = await bcrypt.hash(password , salt);
   const user = await User.create({
    username:username , 
    password:hashhingPass , 
    email:email , 
    role:role
   })
  if(!user) {
    return res.status(400).json({message:"Failed to signing Up"})
  }
  const {accessToken , refreshToken} = await generateTokens(user)
  await user.save()
  return res.status(200).json({message:"User Created Successfuly" , user:user , accessToken:accessToken , refreshToken:refreshToken})
};

module.exports.loginController = async (req, res) => {
    const {email , password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({message:"please Signup First"})
    }
    const passwordMatch = await bcrypt.compare(password , user.password);
    if(!passwordMatch) {
        return res.status(400).json({message:"Invalid Password"})
    }
    const {accessToken , refreshToken} = await generateTokens(user)
    return res.status(200).json({message:"Login Successfuly" , accessToken , refreshToken})
};

module.exports.otpController = async (req, res) => {
    // Implement OTP verification logic here
};

module.exports.refreshTokenController = async (req , res) => {
  const {refreshToken} = req.body;
  const verifyRefreshToken = await verifyRefreshToken(refreshToken)
  if(!verifyRefreshToken) {
    return res.status(400).json({message:"Failed to verifying"})
  }
  return res.status(200).json({message:"Access Token generated successfuly"});
}


module.exports.logoutController = async (req ,res) => {
  try {
    const {refreshToken} = req.body;

    // Check if refresh token exists in the request body
    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required for logout" });
    }
    // Remove the refresh token from the database
   await UserToken.deleteOne({token:refreshToken})

    // Respond with success message
    return res.status(200).json({ message: "User successfully logged out" });
} catch (error) {
    // Handle errors
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
}
}