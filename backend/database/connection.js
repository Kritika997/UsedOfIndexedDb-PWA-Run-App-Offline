const mongoose = require('mongoose')
const connectToCluster = "mongodb+srv://"+ process.env.DB_USER  +":"+ process.env.DB_PASS+"@cluster0.vetm4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(
    connectToCluster,
    {useNewUrlParser: true, useUnifiedTopology: true}
).then((res)=>{
    console.log("Connected to DB..");
}).catch((err)=>{
    console.log(err);
})

module.exports = mongoose;


