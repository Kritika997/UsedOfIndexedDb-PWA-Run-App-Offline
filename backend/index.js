require('dotenv').config();
const express = require("express");
const server = express();


//database connection
const database = require("./database/connection");
//parser
const bodyParser = require("body-parser");
//cors
const cors = require("cors");


//body parser for the params
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

//user CORS
server.use(cors());

//routes
const item = require("./routes/item");

server.use("/", item);

server.use((req, res, next) => {
  const error = new Error("Unable to manage the request");
  //send a status code error
  error.status = 404;
  //forward the request with the error
  next(error);
})

//------------- error message
server.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    "error": {
      "message": error.message
    }
  })
});


const port = process.env.PORT || 8000;


//create the server
server.listen(port, () => {
  console.log("Server is running @ localhost:8000");
});


