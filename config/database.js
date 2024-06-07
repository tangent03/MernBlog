//import mongoose and dotenv
const mongoose = require("mongoose");

require("dotenv").config();


//connect with Db Function
const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => {
        console.log(err);
        console.log("Failed to connect to MongoDB");
        process.exit(1);
    })
};


//export
module.exports = connectDB;