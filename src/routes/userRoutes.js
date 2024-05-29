const express = require('express');
const router = express.Router();

const {
    getAcco ,
    createAcco ,
    editAccoById ,
    deleteAccoById ,
    reserveAccomodation , 
    cancelReserving ,
    getAccomodationReviews
} = require('../controllers/userController');

const {isAuth} = require('../middlewares/isAuth');
const { isOwner } = require('../middlewares/isOwner');

router.get('/' , getAcco );
router.post('/' , isAuth,createAcco);
router.patch('/:id' ,isAuth , isOwner, editAccoById);
router.delete('/:id' , isAuth  , isOwner,deleteAccoById);
router.get('/reviews/:id' , isAuth , getAccomodationReviews)

router.post('/reserve/:id' , isAuth , reserveAccomodation);
router.post('/cancel/:reservationId' , isAuth , cancelReserving);





module.exports = router