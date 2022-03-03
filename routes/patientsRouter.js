//express framework is required here to use in app
const express = require("express");

//here auth folder is require and than jsonwebtoken and bcrypt is installed and require
const auth = require("../auth/auth");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");


//module folder  is require here for use of created model
const Patients = require("../modules/customermodules");

//router is require to create a new router object
const router = new express.Router();

const upload = require("../uploads/uploads");
const res = require("express/lib/response");



// router is especially for determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on). 
//route for patients registration
router.post("/patients/register", function (req, res) {
    console.log(req.body)
    const username = req.body.username;
    Patients.findOne({ username: username }).then(function (patientsdata) {
        //if the username is in the database then
        if (patientsdata != null) {
            res.json({ message: "username exist" })
            return;
        }

        const password = req.body.password;
        // bcryptjs.hash module enables storing of passwords as hashed passwords instead of plaintext.
        // this process will encrypt the password we submitted and if any error occured it will return error message
        bcryptjs.hash(req.body.password, 10, function (e, hashed_pw) {
            //hashed_pw can be anything
            console.log(hashed_pw)
            const phone = req.body.phone;
            const address = req.body.address;
            const age = req.body.age;
            const cdata = new Patients({
                username: username,
                password: hashed_pw,
                phone: phone,
                age: age,
                address: address
            })

            cdata.save().then(function () {
                res.json({ message: "Registration succed", success:true })
            })
            //If any statement within the try -block throws an exception, control is immediately shifted to the catch -block
                .catch(function (e) {
                    console.log(e)
                    res.json(e)
                })


        })

    })
})



router.post("/login", function (req, res) {
    console.log(req.body)

    const username = req.body.username;



    //select* from customer where username is = admin

    Patients.findOne({ username: username }).then(function (patientsdata) {

        //console.log(patientsdata);

        if (patientsdata === null) {

            return res.json({ message: "invalid" })

        }

        //need to check password

        const password = req.body.password;

        bcryptjs.compare(password, patientsdata.password, function (e, result) {

            //true-correct password, false=incorrect pw

            if (result === false) {

                return res.json({ message: "invalid" })

            }

            // for token generated
            //install jsonwebtoken and require it 
            patientsdata.password  = null;
            const token = jsonwebtoken.sign({ userId: patientsdata._id, user: patientsdata }, "anysecretkey")

            res.json({ token: token, message: "successfully login!" })

        })

    })

})



router.delete("/customer/delete", auth.verifyCustomer, function (req, res) {
    res.json({ phone: "req.customerInfo.phone" });

})


// customer profile update

router.put("/patient/profile/update", auth.verifyCustomer, function (req, res) {

    // console.log(req.customerInfo);
    const id = req.customerInfo._id;
    const phone = req.body.phone;
    Patients.updateOne({ _id: id }, { phone: phone })
        .then(function () {
            res.json({ msg: "update" })

        })
        .catch(function () {
            res.json({ msg: "Try again" })

        })


})

//patients delete by patients themselves

router.delete("/patient/profile/delete", auth.verifyCustomer, function () {
    const id = req.customerInfo._id;
    Patients.findOneAndDelete(id)
        .then(function () {
            res.json({ msg: "Delete" })

        })
        .catch(function () {
            res.json({ msg: "Try again" })

        })

        

})


// customer delete by admin

// router.delete("/customer/delete", auth.verifyAdmin, function () {
//     const id = req.adminInfo._id;
//     const cid = req.body.id;

//     Patients.deleteOne({_id: cid})
//     .then()
//     .catch()


// })

// router.post("/single",upload.array('images',3), function(req,res){
//     console.log(req.files);
//    // res.send("single file updated");

// });





//upload.single=> upload middleware can only send single file, 
//upload.array('images', 3), and req.files inplace of req.file for uploading multiple files at once
router.post("/new/upload", upload.single('image'), function (req, res) {
     // console.log(req.file);
    
    if (req.file == undefined) {

        return res.json({

            message: "invalid file format only jpeg and png are allowed"

        })

    }



    //code after success
})






module.exports = router;