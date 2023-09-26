require("dotenv").config()
const express= require("express");
const bodyParser= require("body-parser");
const { route } = require("./routes/handler");
const port= process.env.port
const router = require("./routes/handler");
const DB= require("./DB/connectDB");

const app= express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api/v5", router);

const start= async() =>{
    await DB()
    app.listen(port, ()=>{
        console.log(`App is Running on port ${port}..`)
    })
}

start()