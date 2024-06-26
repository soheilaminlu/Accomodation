
const accomodation = require('../model/accomodation');
const Accomodation = require('../model/accomodation');
const Reservation = require('../model/reservation');
const Review =  require('../model/review')
const {User} = require('../model/user')


module.exports.getAcco = async (req , res) => {
    try {
        const accomodation = await Accomodation.find({isReserved:false})
if(accomodation.length == 0){
    return res.status(404).json({message:"Not found Any place"})
}
return res.status(200).json(accomodation)
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }

}

module.exports.createAcco = async (req ,res ) => {
try {
    const owner = req.user._id
    const {name , cost , description , roomNumber} = req.body;
    const createPlace = await Accomodation.create({
        name:name , 
        cost: cost , 
        description: description,
        owner:owner ,
        roomNumber
    })
    
    if(!createPlace) {
        return res.status(400).json({message:"Failed to Create Place"})
    }
    return res.status(200).json({message:"Place created Successfuly" , accomodation:createPlace});
} catch (error) {
    return res.status(500).json({message:"Internal Server" , error:error.message})
}
}

module.exports.editAccoById = async (req , res) => {
    try {
        const updates = req.body;
        const {id} = req.params;
      const accomodation = await Accomodation.findById(id);
      if(!accomodation) {
        return res.status(404).json({message:"Not Found Accomodation"})
      }
      for (let key in updates) {
        if (accomodation[key] !== undefined) {
          accomodation[key] = updates[key];
        }
      }
      await accomodation.save()
      return res.status(200).json({message:"Place Updated Successfuly"})
     } catch (error) {
       return res.status(500).json({message:"Internal Server" , error:error.message})
    }

}

module.exports.deleteAccoById = async (req , res ) => {
const {id} = req.params;
const deleteAccomodation = await Accomodation.findByIdAndDelete(id);
console.log('heeeeey')
if(!deleteAccomodation) {
    return res.status(400).json({message:"Failed to Delete Your Accomodation"})
}
return res.status(200).json({message:"Deleted Successfuly" , deleteAccomodation:deleteAccomodation})
}


module.exports.reserveAccomodation = async (req , res ) => {
    try {
        const {id} = req.params;
        const user = req.user._id
        // const {checkIn , checkOut} = req.body
        const accomodation = await Accomodation.findById(id);
        if(!accomodation) {
            return res.status(404).json({message:"Not Found Accomodation"})
          }
          if(req.user._id.toString() === accomodation.owner.toString()) {
            return res.status(400).json({message:"owner cant reserve its Place"})
          }
          const reservation = await Reservation.create({
            user:user ,
            accomodaition:accomodation
            // checkIn:checkIn ,
            // checkOut:checkOut
          })
          if(!reservation) {
            return res.status(400).json({message:"Failed to create Reservation"})
          }
           accomodation.isReserved = true
          await reservation.save()
          await accomodation.save()
          return res.status(200).json({message:"Accomodation reserved successfuly" , 
          reservation:reservation , 
          accomodationReserved:accomodation})
         
    } catch (error) {
        return res.status(500).json({message:"Internal Server" , error:error.message})
    }
}


module.exports.cancelReserving = async(req , res) => {
    try {
        const {reservationId} = req.params;
        const {accomodationId} = req.body;
        const  reservation = await Reservation.findById(reservationId);
        if(!reservation) {
            return res.status(404).json({message:"Not Found Accomodation"})
          }
          const accomodaition = await Accomodation.findById(accomodationId)
          if(!accomodaition) {
            return res.status(404).json({message:"Not Found Accomodation"})
          }
          await Reservation.findByIdAndDelete(reservationId);
           accomodaition.isReserved = false
           await accomodaition.save()
            return res.status(200).json({message:"Reservation canceled Successfuly" , accomodationState:accomodation})
          }       
    catch (error) {
        return res.status(500).json({message:"Internal Server" , error:error.message})
    }
  }

  module.exports.getAccomodationReviews = async(req , res) => {
  const {id} = req.params;
  const accomodation = await Accomodation.findById(id);
  if(!accomodation) {
    return res.status(404).json({message:"Not Found Accomodation"})
  }
  const accomodationReviews = await Review.find({accomodation , isVaild:true});
   return res.status(200).json({message:"Reviews Loaded Successfuly" , reviews:accomodationReviews})
  }
