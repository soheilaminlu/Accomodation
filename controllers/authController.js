const Joi = require('joi');
const bcrypt = require('bcrypt')
const {User , validateUser} = require('../model/user');
const {generateAccessToken , generateRefreshToken} = require('../configs/jwt');

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
  const accessToken = await generateAccessToken(user._id , user.email , user.role)
  const refreshToken = await generateRefreshToken(user._id);
  res.cookie('jwt' , accessToken  , {httpOnly:true})
  console.log(accessToken)
  console.log(refreshToken)
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
    const accessToken = await generateAccessToken(user._id , user.email , user.role)
  const refreshToken = await generateRefreshToken(user._id);
  res.cookie('jwt' , accessToken  , {httpOnly:true})
    return res.status(200).json({message:"Login Successfuly" , accessToken , refreshToken})
};

module.exports.logoutController = async (req, res) => {
    // Implement logout logic here
};

module.exports.otpController = async (req, res) => {
    // Implement OTP verification logic here
};
