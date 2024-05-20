const Accommodation = require('../model/accomodation');
const review = require('../model/review');
const Review = require('../model/review');

module.exports.getAllReviews = async () => {
const {accomodatoinId} = req.body
const reviews = await Accommodation.findById(accomodatoinId).populate({
    path:'reviews' ,
    select:'description' , 
    populate:{
        path: 'owner' ,
        select:'username'
    }
}) 
if(!reviews) {
    return res.status(404).json({message:"not found reviews"})
}
return res.status(200).json({message:"Reviews Loaded Successfuly" , reviews:reviews})
}


module.exports.postReview = async () => {
    try {
        const {owner  , description , place , rate} = req.body;
        const newReview = new Review({
            owner,
            place,
            description,
            rate
        });
        const savedReview = await newReview.save();
        if(!savedReview) {
            return res.status(400).json({message:"Failed to Add new review"})
        }
        const accomodation = Accommodation.findByIdAndUpdate(place , {
            $push:{reviews:newReview}
        })
        if(accomodation) {
        return res.status(200).json({message:"add review Successfuly" , 
        review:savedReview , 
        accomodation:accomodation})
        }
        return res.status(400).json({message:"cat modify Accomodation"}) 
    } catch (error) {
       return res.status(500).json({message:"Internal Server Error"})
    }

}

module.exports.editReviewByOwner = async () => {

}


module.exports.deleteReviewByAdmin = async () => {

}



