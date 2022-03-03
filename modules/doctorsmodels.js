const mongoose = require("mongoose");


const Doctors = mongoose.model('Doctorss', {

    username: {type: String},

    password: { type: Number },

    age: {type: Number},

    address: {type: String },

    phone: {type: String},

    email:{type: Number}



})







module.exports = Doctors;