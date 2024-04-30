const mongoose = require('mongoose');
const schema = mongoose.Schema;


const accommodationSchema = new schema({
name : {type:String , required:true} , 
description:String , 
cost:{type:Number , required:true} , 
owner:{type:mongoose.Types.ObjectId , ref:'User'} , 
reviews: {type:mongoose.Types.ObjectId , ref:'Review'} ,
avrageRate:{type:Number}
});


module.exports = mongoose.model('Accommodation' , accommodationSchema)

