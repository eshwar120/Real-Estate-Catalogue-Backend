const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        trim: true
    },
    City: {
        type:String,
        enum:["Mumbai", "Pune", "Kolhapur", "Belguam", "Surat", "Nashik"],
        required: true
    },
    Area:{
        type: String,
        required: true,
        trim: true
    },
    Pincode:{
        type: String,
        required: true
    },
    Address:{
        type:String,
        required: true,
        trim: true
    },
    Landmark: {
        type: String,
        trim: true
    },

    Latitude: {
        type: Number
    },
    Longitude: {
        type: Number
    },
    generalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "generals",
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId
    }
})


module.exports=mongoose.model("location", locationSchema);