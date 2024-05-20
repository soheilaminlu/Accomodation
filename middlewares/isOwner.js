const Accomodation = require('../model/accomodation')


const isOwner = async (req , res, next) => {
const {id} = req.params
const accomodation = await Accomodation.findById(id);
if(accomodation.owner === req.user) {
 return next();
}
return res.status(400).json({message:"you are not Owner of this place"})

}



module.exports = {
    isOwner
}