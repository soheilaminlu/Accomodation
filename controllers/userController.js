
const Accomodation = require('../model/accomodation');


module.exports.getAcco = async (req , res) => {
    try {
        const accomodation = await Accomodation.find({})
if(accomodation.length == 0){
    return res.status(404).json({message:"Not found Any place"})
}
return res.status(200).json(accomodation)
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }

}

module.exports.createAcco = async () => {
try {
    const owner = req.user
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
    createPlace.owner = req.user
    return res.status(200).json({message:"Place created Successfuly" , accomodation:createPlace});
} catch (error) {
    return res.status(500).json({message:"Internal Server"})
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


module.exports.reserveAccomodation = () => {
    try {
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server"})
    }
}


module.exports.cancelReserving = () => {
    try {
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server"})
    }
}