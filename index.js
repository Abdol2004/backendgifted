require("dotenv").config()
const express= require("express");
const bodyParser= require("body-parser");
const { route } = require("./routes/handler");
const port= process.env.port
const router = require("./routes/handler");
const DB= require("./DB/connectDB");
const moongoose= require("mongoose")
const passport= require("passport")
const session = require('express-session');

const app= express();
require("./controller/passport")(passport)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/v5", router);

const start= async() =>{
    await DB()
    app.listen(port, ()=>{
        console.log(`App is Running on port ${port}..`)
    })
}

start()