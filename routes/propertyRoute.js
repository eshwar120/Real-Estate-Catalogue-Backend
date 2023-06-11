const express = require("express");
const Property = require("../model/Property");
const addPropertyController = require("../controller/addPropertyController");
const propertyRoute = express.Router();

propertyRoute.post('/addNew', addPropertyController);

propertyRoute.get('', async (req, res) => {
    try {
        const data = Property.find({}).sort("-postedOn");
        res.status(200).json({
            "status": "success",
            "result": data
        })
    }
    catch (err) {
        res.status(500).json({ "status": err.message });
    }

});

propertyRoute.get('/:id', async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const data = Property.findOne({ PPDId: id }).sort("-postedOn");
            res.status(200).json({
                "status": "success",
                "result": data
            })
        }
        catch (err) {
            res.status(500).json({ "status": err.message });
        }
    }
    else {
        res.status(404).json({ "status": "failed" })
    }

});


propertyRoute.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const newPropertyData = req.body;
    if (id && newPropertyData) {
        try {
            const data = await Property.updateOne({ _id: id }, newPropertyData);
            res.status(200).json({
                "status": "success",
                "result": data
            })
        }
        catch (err) {
            res.status(500).json({ "status": err.message });
        }
    }
    else {
        res.status(400).json({ "status": "failed" })
    }
})

module.exports = propertyRoute;