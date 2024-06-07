//import express and dotenv

const express = require("express");
const app = express();

require("dotenv").config();


//dotenv se port no define karni hai
const PORT = process.env.PORT || 3000;

//middleware laoo
app.use(express.json());

//routes aur mounted route
const blog = require("./routes/blog");
app.use("/api/v1", blog);

//import database and call it
const connectWithDB = require("./config/database");
connectWithDB();


//server start karo
app.listen(PORT, () => {
    console.log(`app is Started at Port No ${PORT}`);
})


//default route initialised
app.get("/", (req,res) => {
    res.send("This is Home Page");
})