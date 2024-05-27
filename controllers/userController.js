
const accomodation = require('../model/accomodation');
const Accomodation = require('../model/accomodation');
const Reservation = require('../model/reservation');
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
    const {name , cost , description , roomNumber} = req.body;
    const createPlace = await Accomodation.create({
        name:name , 
        cost: cost , 
        description: description,
        owner ,
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

module.exports.editAccoById = async () => {
    try {
        const {name , cost , description} = req.body;
        const {id} = req.params;
      const accomodation = await Accomodation.findById(id);
      if(!accomodation) {
        return res.status(404).json({message:"Not Found Accomodation"})
      }
       accomodation.name = name , 
       accomodation.cost = cost ,
       accomodation.description = description
      await accomodation.save()
      return res.status(200).json({message:"Place Updated Successfuly"})
     } catch (error) {
       return res.status(500).json({message:"Internal Server"})
    }

}

module.exports.deleteAccoById = async () => {
const {id} =req.params;
const deleteAccomodation = await Accomodation.findByIdAndDelete(id);
if(!deleteAccomodation) {
    return res.status(400).json({message:"Failed to Delete Your Accomodation"})
}
return res.status({message:"Deleted Successfuly" , deleteAccomodation:deleteAccomodation})
}


module.exports.reserveAccomodation = async () => {
    try {
        const {id} = req.params;
        const user = req.user
        const {checkIn , checkOut} = req.body
        const accomodation = await Accomodation.findById(id);
        if(!accomodation) {
            return res.status(404).json({message:"Not Found Accomodation"})
          }
          const reservation =  Reservation.create({
            user:user ,
            accomodaition:accomodation ,
            checkIn:checkIn ,
            checkOut:checkOut
          })
          if(!reservation) {
            return res.status(400).json({message:"Failed to create Reservation"})
          }
          await reservation.save()
          return res.status(200).json({message:"Accomodation reserved successfuly" , 
          reservation:reservation , 
          accomodationReserved:accomodation})
         
    } catch (error) {
        return res.status(500).json({message:"Internal Server"})
    }
}


module.exports.cancelReserving = async() => {
    try {
        const {id} = req.params;
        const {userId , accomodationId} = req.body
        const  reservation = await Reservation.findById(id);

        if(!reservation) {
            return res.status(404).json({message:"Not Found Accomodation"})
          }
          const user = await User.findById(userId)
          if(!user) {
            return res.status(404).json({message:"Not Found User"})
          } 
          const accomodaition = await Accomodation.findById(accomodationId)
          if(!accomodaition) {
            return res.status(404).json({message:"Not Found Accomodation"})
          }
          if(user._id === reservation.user && accomodation._id === reservation.accomodation) {
            if(accomodaition.isReserved = true) {
                accomodaition.isReserved = false
            }
            return res.status(200).json({message:"Reservation canceled Successfuly"})
          } 

          
    } catch (error) {
        return res.status(500).json({message:"Internal Server"})
    }
}