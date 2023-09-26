const moongoose= require("mongoose");

const userSchema= new moongoose.Schema({

})

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;