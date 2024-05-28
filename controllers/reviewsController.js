const Accommodation = require('../model/accomodation');
const Review = require('../model/review');

module.exports.getAllReviews = async (req , res) => {
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


module.exports.postReview = async (req , res) => {
    try {
        const owner = req.user._id
        const  {description , accomodation , rate} = req.body;
        const newReview = await new Review({
            owner,
            accomodation,
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
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(
            accomodation,
            { $push: { reviews: savedReview._id } },
            { new: true }
        );

        if (!updatedAccommodation) {
            return res.status(400).json({ message: "Failed to modify Accommodation" });
        }

        // Calculate the new average rate for the accommodation
        const reviews = await Review.find({ accomodation: updatedAccommodation });
        const totalReviews = reviews.length;
        let totalRate = 0;
        reviews.forEach(review => {
            totalRate += review.rate;
        });
        const averageRate = totalRate / totalReviews;

        // Update the accommodation's averageRate field
        updatedAccommodation.avrageRate = averageRate;
        await  updatedAccommodation.save();

        return res.status(200).json({
            message: "Review added successfully",
            review: {savedreview:savedReview.description , savedreviewOwner:savedReview.owner},
            accomodation: updatedAccommodation
        });
    } catch (error) {
       return res.status(500).json({message:"Internal Server Error" , error:error.message})
    }

}




