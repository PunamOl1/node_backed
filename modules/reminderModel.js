const mongoose = require ("mongoose");
//const Patients = require("./customermodules");



const Reminder = new mongoose.Schema({
    title:{
        type:String
    },


    description: { type: String

    },

    

   

    date: {  type: Date

    },

    time : {  type: String

    },

    


})

module.exports =  mongoose.model('Reminders', Reminder);