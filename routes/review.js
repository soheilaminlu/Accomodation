const express = require('express');
const router = express.Router();
const {isAuth} = require('../middlewares/isAuth')

const {
    getAllReviews ,
    postReview ,
} = require('../controllers/reviewsController')


router.get('/' , getAllReviews);
router.post('/' , isAuth ,postReview);







module.exports = router