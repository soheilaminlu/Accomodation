const Joi = require('joi');
const bcrypt = require('bcrypt')
const {User , validateUser} = require('../model/user')

module.exports.signupController = async (req, res) => {
    const {username , password , email} = req.body
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
    email:email
   })
  if(!user) {
    return res.status(400).json({message:"Failed to signing Up"})
  }
  return res.status(200).json({message:"User Created Successfuly" , user:user})
};

module.exports.loginController = async (req, res) => {
    // Implement login logic here
};

module.exports.logoutController = async (req, res) => {
    // Implement logout logic here
};

module.exports.otpController = async (req, res) => {
    // Implement OTP verification logic here
};
