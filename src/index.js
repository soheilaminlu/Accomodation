require('dotenv').config({ path: 'ENV_FILENAME' })

const express = require('express');
const { dbConfig } = require('./configs/db');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const usersRoute = require('./routes/userRoutes');
const reviewsRoute = require('./routes/review');
const adminRoutes = require('./routes/adminRoutes');


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
app.use('/auth' , authRoutes);
app.use('/acco' , usersRoute);
app.use('/reviews' , reviewsRoute);
app.use('/admin' , adminRoutes)

app.get('/' , (req , res) => {
    res.json("hey iits just test")
})

app.listen(port, () => {
    console.log(`Server Connected on ${port}`);
})











