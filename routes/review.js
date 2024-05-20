const express = require('express');
const router = express.Router();


const {
    getAllReviews ,
    postReview ,
    editReviewByOwner ,
    deleteReviewByAdmin
} = require('../controllers/reviewsController')


router.get('/' , getAllReviews);
router.post('/' , postReview);
router.patch('/:id' , editReviewByOwner);
router.delete('/:id' , deleteReviewByAdmin);






module.exports = router