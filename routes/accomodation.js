const express = require('express');
const router = express.Router();

const {
    getAcco ,
    createAcco ,
    editAccoById ,
    deleteAccoById
} = require('../controllers/accomodationController')

router.get('/' , getAcco );
router.post('/' , createAcco);
router.patch('/:id' , editAccoById);
router.delete('/:id' , deleteAccoById);




module.exports = router