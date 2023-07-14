const express = require('express');
const FinalInfo = require('../models/FinalInfo');
const addPropertyController = require('../controller/addPropertyController');
const propertyRoute = express.Router();


propertyRoute.get('/:userId', async (req, res) => {
    const id = req.params.userId;
    if (id) {
        try {
            const dataFromDB = await FinalInfo.find({ authorId: id });
            return res.status(200).json({
                "message": "success",
                data: dataFromDB
            })
        }
        catch (err) {
            res.status(500).json({ "message": err.message })
        }
    }
    else {
        res.status(400).json({ "message": "failed" })
    }
});


propertyRoute.post('', addPropertyController);

propertyRoute.patch('/propertyId', async (req, res) => {
    const id = req.params.propertyId;
    const newData = req.body;
    if (id && newData) {
        try {
            const dataFromDB = await FinalInfo.updateOne({_id : id}, newData)
            return res.status(200).json({
                "message": "success",
            })
        }
        catch (err) {
            res.status(500).json({ "message": err.message })
        }
    }
    else {
        res.status(400).json({ "message": "failed" })
    }
    
});


module.exports = propertyRoute;