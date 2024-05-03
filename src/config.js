const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login");

///check database connected or not

connect.then(()=>{
    console.log("Database connected Succesfully")
}).catch(()=>{
    console.log("Database can't be connected")
})


const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },

    password:{
        type: String,
        required:true
    }
});

//collection part

const collection = new mongoose.model("login-signup",loginSchema );
module.exports = collection;
