const express = require('express');
const router = express.Router();

const {
    signupController ,
    loginController , 
    logoutController , 
    otpController , 
    refreshTokenController , 
    logOutController
} = require('../controllers/authController')

router.post('/signup' , signupController);
router.post('/login' , loginController);
router.post('/otp' , otpController);
router.post('/refresh-token' , refreshTokenController)
router.delete('/logout' , logOutController)


module.exports = router