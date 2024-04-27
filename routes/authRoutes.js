const express = require('express');
const router = express.Router();

const {
    signupController ,
    loginController , 
    logoutController , 
    otpController
} = require('../controllers/authController')

router.post('/signup' , signupController);
router.post('/login' , loginController);
router.get('/logout' , logoutController);
router.post('/otp' , otpController);



module.exports = router