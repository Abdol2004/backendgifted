const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname : {
        type: String,
        required: false,
    },
    email : {
        type: String,
        required: false,
    },
    password:{
        type: String,
        required: false,
    },
    earnType:{
        type: String,
        enum:['monthly', 'weekly'],
        required: false,
    },
    googleId: {
        type: String,
        unique: true, 
        sparse: true, 
    },
    googleDisplayName:{
        type: String,
    } 

})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;