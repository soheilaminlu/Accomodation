require('dotenv').config()

const express = require('express');
const { dbConfig } = require('./configs/db');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const accomodationRoute = require('./routes/accomodation')

//CONFIG CORS
app.use(cors({
    credentials:true
}))

// EXPRESS BODYPARSER
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//CONFIG DATABASE
dbConfig()

//ROUTES CONFIG
app.use('/users' , authRoutes);
app.use('/acco' , accomodationRoute)

app.get('/' , (req , res) => {
    res.json("hey iits just test")
})

app.listen(port, () => {
    console.log(`Server Connected on ${port}`);
})











