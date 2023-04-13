const express = require("express");
const router = require("./src/routes/api.js")
const app = new express();
const bodyperser = require('body-parser');

require ("dotenv").config();

//Secuirity middleware........
const expressratelimit = require('express-rate-limit');
const helmet = require('helmet');
const mongosanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

//Database.....
const mongoose = require ('mongoose');


//Secuirity middleware Implement.........
app.use(cors());
app.use(helmet());
app.use(mongosanitize());
app.use(xss());
app.use(hpp());


//Body perser..
// app.use(bodyperser.json());
app.use(bodyperser.json({ limit: '10mb' }));
app.use(bodyperser.urlencoded({ extended: true, limit: '10mb' }));


//Rate Limiter..
const Limiter = expressratelimit.rateLimit({windowMs:15*60*100, max:3000})

//server...
const port = process.env.PORT || 5000;

//Database cloud ...
async function connect(){
    const URL = 'mongodb+srv://rifat:rifat100@cluster0.0yeftlx.mongodb.net/Task-Mnager?retryWrites=true&w=majority'
    try {
       await mongoose.connect(URL) 
       console.log("MongoDb successfully connect")
    } catch (error) {
        console.log("Error connecting to database:", error.message);
    }
}

//Database.....
mongoose
    .set("strictQuery", false)
    .connect(process.env.DATABASE)
    .then(()=>{
        app.listen(port, ()=>{
            connect();
            console.log(`Server Running on port ${port}`);
            console.log(`Database Connect Success`);
        })
    })
    .catch((err)=> console.log(err.message))


    //Routing Implementation....
    app.use("/api/v1",router)

    //Undifined Route Implement...
    app.use("*", (req,res)=>{
        res.status(404).json({status:"fail", data:"Not Found"});
    })



module.exports = app;