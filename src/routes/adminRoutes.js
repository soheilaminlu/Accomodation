const express = require('express');
const router = express.Router();
const {isAdmin} = require('../middlewares/isAdmin')

const {createUser ,getAllUsers ,getUserById ,deleteUser
    ,getReviewById , getAllReserves,getAccomodationReviews , validationReview , 
    deleteReview ,
    getSpecialDates,
    createSpecialDates,
    deleteSpecialDate
 } = require('../controllers/adminController');
const { isAuth } = require('../middlewares/isAuth');



router.post('/user',isAuth , isAdmin ,createUser);
router.get('/users' , isAuth ,isAdmin , getAllUsers);
router.get('/user/:id' , isAuth,isAdmin, getUserById );
router.delete('/user/:id' , isAuth ,isAdmin, deleteUser);


router.get('/review/:id' , isAuth , isAdmin , getReviewById);
router.get('/:accomodationId/reviews' , isAuth ,isAdmin , getAccomodationReviews);
router.patch('/validate-review/:id' , isAuth ,isAdmin , validationReview);
router.delete('/delete-review/:id' , isAuth ,isAdmin, deleteReview);


router.get('/getAllReserve' , isAuth , isAdmin , getAllReserves);
router.delete('/cancelReserve/:reserveId');

router.get('/specialDates' ,isAuth , isAdmin ,getSpecialDates )
router.post('/specialDate' , isAuth , isAdmin , createSpecialDates);
router.delete('/specialDate/:id' , isAuth , isAdmin , deleteSpecialDate)



module.exports = router;