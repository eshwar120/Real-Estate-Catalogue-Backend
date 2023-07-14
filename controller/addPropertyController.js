const multer = require('multer');
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const firebaseConfig = require("../db/fireBase");
const express = require("express");
const general_info = require('../models/Add-property/general_info');
const FinalInfo = require('../models/FinalInfo');
const addPropertyController = express.Router();


// Initialize Firebase
initializeApp(firebaseConfig);

//Intialize cloud storage and get a reference of the service
const storage = getStorage();

//setting up multer as a middle ware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

addPropertyController.use('', upload.single("image"), async (req, res) => {
    console.log(true, "add")
    try {
        console.log(true, "generalinfo");
        console.log(req.body);
        const dateTime = giveCurrentDateTime();
        const storageRef = ref(storage, `files/${req.file.originalname + "    " + dateTime}`);
        //create file metadata including the content type
        const metaData = {
            contentType: req.file.mimetype
        };

        //upload the file in the bucket storage
        const snapShot = await uploadBytesResumable(storageRef, req.file.buffer, metaData);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        //grap public url
        const downloadURL = await getDownloadURL(snapShot.ref);

        const propertyDetails = new FinalInfo ({
            ...req.body,
            image: downloadURL
        })
        const data = await propertyDetails.save();

        console.log(data)
        return res.status(200).json({
            "message": "Property added successfully",
            data
        })

    }
    catch (e) {
        console.log(e)
        return res.status(400).json({
            "message": e.message
        })
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}


module.exports = addPropertyController;