const express = require('express');
const router = express.Router();

const {
    signupController ,
    loginController , 
    logOutController , 
    otpVerify , 
    refreshTokenController 
} = require('../controllers/authController')

router.post('/signup' , signupController);
router.post('/login' , loginController);
router.post('/verify-otp' , otpVerify);
router.post('/refresh-token' , refreshTokenController)
router.delete('/logout' , logOutController)


module.exports = router