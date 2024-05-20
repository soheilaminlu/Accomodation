const mongoose = require('mongoose');
const schema = mongoose.Schema;



const reviewSchema = new schema ({
  owner:{type:mongoose.Types.ObjectId , ref:'User'} , 
  place:{type:mongoose.Types.ObjectId , ref:'Accommodation'} , 
  description:{type:String , required:true} ,  
  rate:{type:Number , min:1 , max:5 , required:true}
})

module.exports = mongoose.model('Review' , reviewSchema)