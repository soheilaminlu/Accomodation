const Accommodation = require('../model/accomodation');
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
        if(!newReview) {
            return res.status(400).json({message:"Failed to create"})
        }
        const savedReview = await newReview.save();
        if(!savedReview) {
            return res.status(400).json({message:"Failed to Add new review"})
        }
        const accomodation = Accommodation.findByIdAndUpdate(place , {
            $push:{reviews:newReview}
        })
        if (!accomodation) {
            return res.status(400).json({ message: "Failed to modify Accommodation" });
        }

        // Calculate the new average rate for the accommodation
        const reviews = await Review.find({ place: place });
        const totalReviews = reviews.length;
        let totalRate = 0;
        reviews.forEach(review => {
            totalRate += review.rate;
        });
        const averageRate = totalRate / totalReviews;

        // Update the accommodation's averageRate field
        accomodation.averageRate = averageRate;
        await accomodation.save();

        return res.status(200).json({
            message: "Review added successfully",
            review: savedReview,
            accomodation: accomodation
        });
    } catch (error) {
       return res.status(500).json({message:"Internal Server Error"})
    }

}




