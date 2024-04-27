const mongoose = require('mongoose');

const dbConfig = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Accomodation')
    .then(() => {
        console.log('Mongo Connected')
    }).catch((error) => {
        console.log(error.message)
    })
};

module.exports = {
dbConfig
}
