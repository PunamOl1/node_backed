

const express = require("express");

const bcryptjs = require("bcryptjs");

const jsonwebtoken = require("jsonwebtoken");
const router = new express.Router();
const auth = require("../auth/auth");
const  Reminders  =  require("../modules/reminderModel")



router.post('/user/reminder', auth.verifyCustomer, function (req,res) {

    const title= req.body.title;
    const description= req.body.description;
    const date=  req.body.date;
    const  time= req.body.time;

    const  data=  new  Reminders({

        title:title,
        description:description,
        date:date,
        time:time



    
    })

    data.save().then(function(){
        res.json({ message: "ok", success:true })
            })

            .catch(function (e) {
                res.json(e)
            })

    })


    router.get("/user/remind", auth.verifyCustomer, function(req,res){
        Reminders.find().then(function(result){
            //console.log(result)
            res.json(result)
        })
        .catch(function(){
            res.json({message : "ok invalid"})
        })
    })


    router.delete("/reminder/delete/:rid", auth.verifyCustomer, function(req,res){
        const rid = req.params.rid;
        //console.log(req.params.rid)

        console.log(req.customerInfo.username)
        Reminders.deleteOne({_id : rid})
        .then(function(){
            res.json({message  : "deleted", type: "success"})
        })
        .catch(function(){
            res.json({message : "try again"})
        })
    })


    router.put("/reminder/update/:rid", auth.verifyCustomer, function (req, res) {

        // console.log(req.customerInfo);
        const rid = req.params.rid;
        //const phone = req.body.phone;
        User.updateOne({ _id: rid })
            .then(function () {
                res.json({ msg: "update" })
    
            })
            .catch(function () {
                res.json({ msg: "Try again" })
    
            })
    
    
    })







    module.exports = router;



















