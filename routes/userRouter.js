const express = require("express");

const bcryptjs = require("bcryptjs");

const jsonwebtoken = require("jsonwebtoken");

const Product = require("../modules/userModel");
const User = require("../modules/userModel");
const  wishlist = require('../modules/wishlist')

const auth = require("../auth/auth");
const upload = require("../uploads/uploads");
const Wishlist = require("../modules/wishlist");

const router = new express.Router();

//const product =require("../modules/userModel");




router.post('/user/insert', auth.verifyCustomer, upload.single('image'), function (req,res) {



    const userId = req.customerInfo;
    const image  = req.file.path
    const pname = req.body.pname;
    //console.log(req.file.path)

    const pdesc = req.body.pdesc;

    const pquantity = req.body.pquantity;

    const pprice = req.body.pprice;


    const data = new Product({
        image:image,
        pname:pname,
        pdesc:pdesc,
        pquantity:pquantity,
        pprice:pprice,
        userId: userId
    })

    data.save().then(function(){
        res.json({ message: "ok" })
            })

            .catch(function (e) {
                res.json(e)
            })

    })

    //to show own product or feedback
    router.get("/user/product", auth.verifyCustomer, function(req,res){
        User.find().then(function(result){
            // console.log(result)
            res.json(result)
        })
        .catch(function(){
            res.json({message : "ok invalid"})
        })
    })



    //to show single product or feedback
    router.get("/user/singleproduct/:pid", auth.verifyCustomer, function(req,res){
        const pid = req.params.pid;
        User.find({_id : pid}).then(function(result){
            res.json(result)
        })
        .catch(function(){
            res.json({message : "ok invalid"})
        })
    })



     //to show delete product or feedback
     router.delete("/usermedi/delete/:pid", auth.verifyCustomer, function(req,res){
        const pid = req.params.pid;
        //console.log(req.params.pid)

        console.log(req.customerInfo.username)
        User.deleteOne({_id : pid})
        .then(function(){
            res.json({message  : "deleted", type: "success"})
        })
        .catch(function(){
            res.json({message : "try again"})
        })
    })




    router.put(
        "/user/update",
        auth.verifyCustomer,
        
        function (req, res) {
          
          
          const pid = req.body.pid;
          const pname = req.body.pname;
          const pdesc = req.body.pdesc;
          const pprice = req.body.pprice;
          const  pquantity=   req.body.pquantity;
          User.updateOne(
            { _id: pid },
            {
              pname: pname,
              pdesc: pdesc,
              pprice: pprice,
              pquantity: pquantity,
              
            }
          )
            .then(function () {
              res.json({
                message: "You have successfully updated !!",
                success: true,
              });
            })
            .catch(function () {
              res.json({ message: "Something went wrong!!!" });
            });
        }
      );



    router.get("/user/upda/:pid", auth.verifyCustomer, function (req, res) {

        // console.log(req.customerInfo);
        const pid = req.params.pid;
        //const phone = req.body.phone;
        User.findOne({ _id: pid })
            .then(function (result) {
                res.json(result)
    
            })
            .catch(function () {
                res.json({ msg: "Try again" })
    
            })
    
    
    })



    router.get("/reminders", function(req,res){
        const id = req.params.id;
        User.find({_id : pid}).then(function(result){
            res.json(result)
        })
        .catch(function(){
            res.json({message : "ok invalid"})
        })
    })

    router.post("/add-cart", function(req, res){
        const userId = req.body.userId
        const productId= req.body.pid;
        console.log(userId);

        const Wishlist = new wishlist({
            product: productId,
            user: userId
        })

        Wishlist.save().then(function(result){
            res.json({message: "Added to cart"})
        })
    })

    router.get("/my-cart/:userId", function(req, res){
        console.log(req.params.userId);

        Wishlist.find({user: req.params.userId}).populate('product').then(function(result){
            res.json({wishlist: result})
        })
    })
   
    router.delete("/remove-wishlist/:wid", function(req, res){
       const  wid= req.params.wid;
       console.log("id",wid)

        Wishlist.findByIdAndDelete(wid, function(err, docs){
            if(!err){
                res.json({msg: "Item removed.", type: "success"})
            }
        })
    })

    router.delete("/clear-wishlist/:id", function(req, res){
        const  id= req.params.id;
        console.log("id",id)
 
         Wishlist.deleteMany({user:id}, function(err, docs){
             if(!err){
                 res.json({msg: "Order has been place successfully", type: "success"})
             }
         })
     })
    









module.exports = router;