const mongoose = require ("mongoose");
const Patients = require("./customermodules");



const Product = new mongoose.Schema({
    image:{ type:String},


    pname: {type: String},

    pdesc: {type: String},

    pquantity : {type: Number},

    pprice: {type: Number},
   userId:{

        type: mongoose.Schema.Types.ObjectId,

        ref: 'Patients'

    }

})

module.exports =  mongoose.model('User', Product);