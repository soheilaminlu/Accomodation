const express = require('express');
const router = express.Router();

const {
    getAcco ,
    createAcco ,
    editAccoById ,
    deleteAccoById
} = require('../controllers/accomodationController');

const {isAuth} = require('../middlewares/isAuth');
const { isOwner } = require('../middlewares/isOwner');

router.get('/' , getAcco );
router.post('/' , isAuth,createAcco);
router.patch('/:id' ,isAuth , isOwner, editAccoById);
router.delete('/:id' , isAuth  , isOwner,deleteAccoById);




module.exports = router