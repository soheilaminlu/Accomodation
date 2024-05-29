 const otpGenerator = require('otp-generator');
 const nodeMailer = require('nodemailer')
 const Otp = require('../model/otp')
 

 const otpGenerate = async(email) => {


    const otp = otpGenerator.generate(6, 
        { digits: true, alphabets: false, upperCase: false, specialChars: false });
        await Otp.create({ email, otp });
        const transporter = nodeMailer.createTransport({
          service:"gmail" ,
          auth:{
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
          }
        }) 
        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`
        });
        return otp
 }

 const otpVerify = async (email , otp) => {
   const otpRecord = await Otp.findOne({email , otp})
   if (otpRecord) {
    await Otp.deleteOne({ email, otp }); // Optionally delete the OTP after verification
    return true;
}
return false
 }

 module.exports = {
    otpGenerate,
    otpVerify
 }
 