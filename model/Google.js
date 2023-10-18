const mongoose= require("mongoose");
const googleSchmea= new mongoose.Schema({
    googleID:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
        
    }
})