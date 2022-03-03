//multer is installed first
const multer = require("multer");



// file upload
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, './patientsimg')

    },

    // filename: function (req, res, cb) {

    //     cb(null, "logo.jpg")



    // },



    filename: function (req, file, cb) {

        cb(null, Date.now() + file.originalname)



    }

})





// code for filtering filr - jpg



const filter = function (req, file, cb) {

    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {

        //correct format

        cb(null, true)

    } else {

        cb(null, false)

    }

}


//piece of middlewre upload. storage and filter object is passed
const upload = multer({

    storage: storage,

    fileFilter: filter

})



module.exports = upload;





