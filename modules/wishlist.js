const mongoose = require("mongoose");


const Wishlist = mongoose.model('Wishlist', {

    product:{
       type:  mongoose.Schema.Types.ObjectId, ref:"User"
    },

    user:{
        type:  mongoose.Schema.Types.ObjectId, ref:"Patients"
     }




})

module.exports =  Wishlist
