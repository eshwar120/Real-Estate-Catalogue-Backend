const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const firebaseConfig = require("../config/fireBase");
const express = require("express");
const Property = require("../model/Property");
const addPropertyController = express.Router();

// Initialize Firebase
initializeApp(firebaseConfig);

//Intialize cloud storage and get a reference of the service
const storage = getStorage();

//setting up multer as a middle ware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

addPropertyController.post('', upload.single("propertyImage"), async (req, res) => {
    console.log(true)
    try {
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

        const propertyData = req.body;
        if (downloadURL) {
            const post = new Property({
                propertyType: propertyData.propertyType,
                negotiable: propertyData.negotiable,
                price: propertyData.price,
                ownerShip: propertyData.ownerShip,
                propertyAge: propertyData.propertyAge,
                propertyApproved: propertyData.propertyApproved,
                propertyDescription: propertyData.propertyDescription,
                bankLoan: propertyData.bankLoan,
                propertyLength: propertyData.PropertyLength,
                propertyBreadth: propertyData.PropertyBreadth,
                propertyArea: propertyData.PropertyArea,
                propertyAreaUnit: propertyData.PropertyAreaUnit,
                noOfBHK: propertyData.noOfBHK,
                noOfFloor: propertyData.noOfFloor,
                Attached: propertyData.Attached,
                westernToilet: propertyData.westernToilet,
                furnished: propertyData.furnished,
                carParking: propertyData.carParking,
                lift: propertyData.lift,
                electricity: propertyData.electricity,
                facing: propertyData.facing,
                name: propertyData.name,
                mobile: propertyData.mobile,
                postedBy: propertyData.postedBy,
                saleType: propertyData.saleType,
                featuredPackage: propertyData.featuredPackage,
                PPDPackage: propertyData.PPDPackage,
                propertyImage: downloadURL,
                UserEmail: propertyData.UserEmail,
                city: propertyData.city,
                locationArea: propertyData.locationArea,
                pincode: propertyData.pincode,
                address: propertyData.address,
                landmark: propertyData.landmark,
                latitude: propertyData.latitude,
                longitude: propertyData.longitude,
                authorId: propertyData.authorId,
                postedOn: new Date()
            });

            const data = await Property.save();
            if (data) {
                return res.status(201).json({
                    "status": "success",
                    "result": data,
                });
            }
            res.status(400).json({
                "status": "failed",
            });
        }
    }
    catch (err) {
        return res.status(500).json({ "status": err.message })
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