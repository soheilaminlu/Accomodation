const mongoose = require('mongoose');
const schema  = mongoose.Schema;


const specialDateSchema = new schema ({
    date:{type:Date , required:true},
    increaseCost:{type:Number , required:true} ,
    accomodation:{type:mongoose.Types.ObjectId , required:true}
});


module.exports = mongoose.model('SpecialDate' , specialDateSchema)