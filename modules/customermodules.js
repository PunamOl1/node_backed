const mongoose = require("mongoose");

const Schema = mongoose.Schema

const userSchema = new Schema(

 {

    username: {type: String},

    password: { type: String },

    age: {type: Number},

    address: {type: String },

    phone: {type: Number},
    
    isadmin:{type:Boolean, default:false},

},{timestamps:true})



const Patients = mongoose.model('Patients', userSchema)
module.exports = Patients;

