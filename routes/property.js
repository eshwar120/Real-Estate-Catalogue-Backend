const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");
const path = require("path");
const Authentication = require("../middlewares/jwt");
//IMPORT MODELS
const BasicInfo = require("../models/Add-property/basic_info");
const generalInfo = require("../models/Add-property/general_info");
const locationInfo = require("../models/Add-property/location_info");
const propertyInfo = require("../models/Add-property/property_details");

//IMPORT CONTROLLERS
const addPropertyController = require('../controller/addPropertyController');
const basic_info = require('../models/Add-property/basic_info');
const general_info = require('../models/Add-property/general_info');



//POST END POINT FOR BASIC DETAILS 
router.post("/api/pro/basic", async (req, res) => {

    try {
        console.log(true)
        const basicdetails = await BasicInfo.create(req.body)
        return res.status(200).json({
            message: "success",
            basicdetails
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
})


//POST END POINT FOR GENERAL DETAILS 
router.use("/api/pro/general", addPropertyController);

//  upload, async (req, res) => {
//     try {

//         const { image } = req.file
//         const generaldetails = await generalInfo.create({
//             ...req.body,
//             image: req.file.filename
//         })
//         return res.status(200).json({
//             message: "success",
//             generaldetails
//         })
//     } catch (e) {
//         return res.status(400).json({
//             message: e.message
//         })
//     }

// })


//POST END POINT FOR LOCATION DETAILS 
router.post("/api/pro/location", async (req, res) => {
    try {
        const locationdetails = await locationInfo.create(req.body);
        return res.status(200).json({
            message: "success",
            locationdetails,
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

})


//POST END POINT FOR PROPERTY DETAILS 
router.post("/api/pro/property", async (req, res) => {
    try {

        const propertydetails = await propertyInfo.create(req.body)
        return res.status(200).json({
            message: "success",
            propertydetails
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
})



//REQUIRED FIELD POST REQUEST
// router.post("/api/v4/require", upload, async (req, res) => {
//     try {
//         const { image } = req.file
//         const requireInfodetails = await requireInfo.create({
//             ...req.body,
//             image: req.file.filename,
//         })
//         return res.status(200).json({
//             message: "success",
//             requireInfodetails
//         })
//     } catch (e) {
//         return res.status(400).json({
//             message: e.message
//         })
//     }
// })

//REQUIRED FIELD GET REQUEST
// router.get("/requireinfo", async (req, res) => {
//     try {
//         const requiredData = await requireInfo.find();
//         return res.status(200).json({
//             message: "success",
//             requiredData
//         })
//     } catch (e) {
//         return res.status(400).json({
//             mesaage: e.mesaage
//         })
//     }
// })



//GET ALL DATA OF A PROPERTY
router.get("/api/alldata", async (req, res) => {
    try {

        // const locationcollection = await locationInfo.find().populate({
        //     path: "generalInfo",
        //     select: "mobile image generalInfo",
        //     populate: {
        //         path: "propertyInfo",
        //         select: "ppdid totalArea  propertyInfo",
        //         populate: {
        //             path: "basicInfo",
        //             select: "property basicInfo"
        //         }
        //     }
        // }).select("generalInfo propertyInfo basicInfo");
        // const authorId = req.params.author
        // if (authorId) {
            const locationcollection = await general_info.find()
            // const locationcollection = await locationInfo.find({ authorId: authorId })
            //     .populate({
            //         path: "generalInfo",
            //         populate: {
            //             path: "propertyInfo",
            //             populate: {
            //                 path: "basicInfo"
            //             }
            //         }
            //     })

            console.log(locationcollection)

            return res.status(200).json({
                message: "success",
                locationcollection,
            });
        // }
        // else {
            // return res.status(400).json({
            //     message: failed
            // });
        // }
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


//IMAGES
router.get("/api/images/:fileName", (req, res) => {
    return res.sendFile(path.join(__dirname, `../uploads/${req.params.fileName}`))
})


module.exports = router;