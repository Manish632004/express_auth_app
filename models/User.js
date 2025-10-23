const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]  // limit ho gaya in teen main se hi hoga 
    }
});

module.exports = mongoose.model("user",userSchema)