const express = require("express");
const mongoose = require("mongoose");
const authorRouter = require("./route/blogs");
require("dotenv").config();

const app = express();//express instant
app.use(express.json());//new body-parser
app.use("/test", (req,res) => {
    res.send("hello world");
})

const PORT = process.env.PORT; //best practice makes me have a default port

mongoose.connect(`${process.env.MONGO_DB}`, {//making the connection to mongodb atlas
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGODB is established successfully");
});

//WE WILL NOW EXTEND THE PATH TO ANOTHER FILE (GOTTA CHECK ON WHAT ELST TO CALL IT)
//CREATE THE MODEL MONGOOSE SCHEMA AND ROUTES
//MODELS ARE BUILT AND ROUTES ARE CREATED CONNECTING BELOW


app.use("/blogs", authorRouter);


//APP LISTENER FOR NODEMON CONFIRMATION
app.listen(PORT, () => {
  console.log(`The server is up on port: ${PORT}`);
});
