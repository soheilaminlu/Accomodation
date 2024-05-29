const { required } = require('joi');
const mongoose = require('mongoose')
const schema = mongoose.Schema;



const userTokenSchema = new schema({
    userId: {type:mongoose.Types.ObjectId , ref: 'User' , required:true} , 
    token: {type:String , required:true} ,
    createdAt:{type:Date , default:Date.now() , expires:10 * 86400}
})

module.exports = mongoose.model('UserToken' , userTokenSchema)