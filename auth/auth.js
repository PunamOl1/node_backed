const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
const Patients = require("../modules/customermodules");
const User =  require("../modules/userModel");


module.exports.verifyCustomer = function (req, res, next) {

    try {
        const t = req.headers.authorization;
        const to = t.split(" ");
        const token = to[1]
        console.log(token)
        const tokens = req.headers.authorization.split(" ")[1];
        //console.log(req.headers.authorization)
        const data = jsonwebtoken.verify(token, "anysecretkey");
        //console.log("userId",data);//
        Patients.findOne({ _id: data.userId })
            .then(function (result) {
                //console.log(result);

                req.customerInfo = result;
                next();
            })

            .catch(function (e) {
                res.json({ error: e })
            })
    }

    catch (e) {
        console.log(e)
    }

};



/*module.exports.verifyCustomer = function (req, res, next) {

    try {
        const tokens = req.headers.authorization.split(" ")[1];
        const data = jsonwebtoken.verify(tokens, "anysecretkey");
        console.log(data.userId);
        User.findOne({ _id: data.userId })
            .then(function (result) {
                console.log(result);

                req.customerInfo = result;
                next();
            })

            .catch(function (e) {
                res.json({ error: e })
            })
    }

    catch (e) {
        res.json({ error: "invalid access" })
    }

};*/