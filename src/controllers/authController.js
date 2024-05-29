const Joi = require('joi');
const bcrypt = require('bcrypt')
const {User , validateUser} = require('../model/user');
const {generateTokens} = require('../configs/jwt');
const UserToken = require('../model/userToken');
 const  {verifyRefreshToken}  = require('../configs/verifyRefreshToken')
 const jwt = require('jsonwebtoken');
const { otpGenerate , otpVerify } = require('../configs/otp');

module.exports.signupController = async (req, res) => {
  try {
    const {username , password , email  , role} = req.body
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
  await user.save();
  const otp = otpGenerate(email)
  console.log(`${otp} send to ${email}`)
  return res.status(200).json({message:"User Created Successfuly" , user:user})
  } catch (error) {
    return res.status(500).json({message:"Internal Server Error"})
  }
    
};

module.exports.loginController = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({message:"Internal Server Error" , error:error.message})
  }
   
};

module.exports.otpVerify = async (req, res) => {
  const {email , otp} = req.body
  try {
    const isValid = await otpVerify(email , otp);
    if(!isValid) {
      return res.status(400).json({message:"Invalid otp"})
    }
    return res.status(200).json({message:"Otp is Valid"})

  } catch (error) {
    return res.status(500).json({message:"Internal Server Error"})
  }
   
};

module.exports.refreshTokenController = async (req , res) => {
  try {
    const {refreshToken} = req.body;
    const refreshTokenResult = await verifyRefreshToken(refreshToken);
    if(!refreshToken) {
      return res.status(400).json({message:"Not Valid refreshToken"})
    }
    const {tokenDetails} = refreshTokenResult;
    const payload = {userId:tokenDetails._id , role:tokenDetails.role};
    const newAccessToken = await jwt.sign(
      payload , 
     process.env.ACCESS_TOKEN_SECRET ,
     {expiresIn:'60m'}
    )
    if(!newAccessToken) {
      return res.status(400).json({message:"Failed to Create new Access Token"})
    }
    return res.status(200).json({message:"Accesstoken Created Successfuly" , accessToken:newAccessToken})
  } catch (error) {
    return res.status(500).json({message:"Internal Server Error"})
  }
 
}


module.exports.logOutController = async (req ,res) => {
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