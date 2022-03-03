const express = require("express");

const bcryptjs = require("bcryptjs");

const jsonwebtoken = require("jsonwebtoken");
const router = new express.Router();
const auth = require("../auth/auth");
const  Booking  =  require("../modules/booking")



router.post('/user/booking', auth.verifyCustomer, function (req,res) {

console.log(req.body)

    const userId = req.customerInfo;
    const Name  = req.body.Name;
    const description = req.body.description;
    //console.log(req.file.path)

    const email  = req.body.email;

    const date = req.body.date;

    const gender = req.body.gender;
    const age = req.body.age;


    const data = new Booking({
        
        Name:Name,
        description:description,
        email:email,
        date:date,
        gender: gender,
        age:age
    })

    data.save().then(function(){
        res.json({ message: "ok", success:true })
            })

            .catch(function (e) {
                res.json(e)
            })

    })

    router.get("/admin/viewbookings", auth.verifyCustomer, function(req,res){
        Booking.find().then(function(result){
            //console.log(result)
            res.json(result)
        })
        .catch(function(){
            res.json({message : "ok invalid"})
        })
    })

    module.exports = router;
