// adminController.js

const Accomodation = require("../model/accomodation");
const Review = require("../model/review");
const { User } = require("../model/user");

module.exports.createUser = async (req, res) => {
    try {
       const {username , password , role , email} = req.body;
       const {error} =  await validateUser(req.body);
   if(error) {
   return res.status(400).json({message:"Validation Failed" , error:error.message})
   }
   const existingUser = await User.findOne({email});
   if(existingUser) {
    return res.status(400).json({message:"Already Exist"})
   }
   const saltRound = 10
   const salt = await bcrypt.genSalt(saltRound)
   const hashhingPass = await bcrypt.hash(password , salt);
       const user = await User.create({
        username ,
        password:hashhingPass, 
        role ,
        email
       });
       if(!user) {
        return res.status(400).json({message:"Failed to Create User"});
       }
       return res.status(200).json({message:"User Created Successfuly" , user:user})
    } catch (error) {
        return  res.status(500).send('Internal Server Error');
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if(users.length = 0) {
            return res.status(404).json({message:"Not Found User"})
        }
        return res.status(200).json({message:"Users Found Successfuly"});
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        const {id} =req.params;
        const user = await User.findById(id);
        if(!user) {
           return res.status(404).json({message:"Not Found User"})
        }
        return res.status(200).json({user:user})
    } catch (error) {
        return  res.status(500).send('Internal Server Error');
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const {id} =req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user) {
           return res.status(404).json({message:"Not Found User"})
        }
        return res.status(200).json({user:user})
    } catch (error) {
        return  res.status(500).send('Internal Server Error');
    }
};

module.exports.getReviewById = async (req, res) => {
    try {
        const {id} =req.params;
        const review = await Review.findById(id);
        if(!review) {
            return res.status(404).json({message:"Not Found review"})
         }
    } catch (error) {
        return  res.status(500).send('Internal Server Error');
    }
};

module.exports.getAccomodationReviews = async (req, res) => {
    try {
        const {accomodationId} = req.params
        const accomodation = await Accomodation.findById(accomodationId);
        if(!accomodation) {
            return res.status(404).json({message:"Not Found any place"})
         } 
         const reviews = accomodation.reviews;
         return res.status(200).json({message:"reviews loaded successfuly" , reviews:reviews})
    } catch (error) {
        return  res.status(500).send('Internal Server Error');
    }
};

module.exports.validationReview = async (req, res) => {
    try {
        const {reviewId} = req.body;
        const review = await Review.findById(reviewId)
        if(!review) {
            return res.status(404).json({message:"Not Found review"})
         } 
        review.isVaild = true;
         review.save();
         return res.status(200).json({message:"Review validated Successfuly"});
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
          return res.status(404).json({ message: 'Review not found' });
        }
    
       return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
       return res.status(500).send('Internal Server Error');
    }
};
