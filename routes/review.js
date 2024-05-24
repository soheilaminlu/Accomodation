const express = require('express');
const router = express.Router();


const {
    getAllReviews ,
    postReview ,
} = require('../controllers/reviewsController')


router.get('/' , getAllReviews);
router.post('/' , postReview);







module.exports = router