const Accomodation = require('../model/accomodation')


const isOwner = async (req , res, next) => {
const {id} = req.params
const accomodation = await Accomodation.findById(id);
if (!accomodation) {
    return res.status(404).json({ message: "Accommodation not found" });
  }
  console.log(accomodation)
if(accomodation.owner=== req.user._id.toString()) {
    console.log(req.user._id);
    console.log(accomodation.owner)
     return next();
}
return res.status(400).json({message:"you are not Owner of this place"})

}



module.exports = {
    isOwner
}