const mongoose = require('mongoose');
const schema = mongoose.Schema;




const reservationSchema = new schema ({
    accomodation: {type:mongoose.Types.ObjectId , ref:'Accomodation'},
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    // checkIn: { type: Date, required: true },
    // checkOut: { type: Date, required: true },
})


module.exports = mongoose.model('Reserve' , reservationSchema)