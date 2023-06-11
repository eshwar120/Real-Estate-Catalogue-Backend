const express = require('express');
const City = require('../model/City');
const cityRoute = express.Router();


cityRoute.post('', async (req, res) => {
    const cityData = req.body;
    if (cityData) {
        try {
            const data = new City({
                cityName: cityData.cityName,
                area: cityData.area,
                pincode: cityData.pincode
            });

            const result = await data.save();
            res.status(201).json({
                "status": "success",
                "result": result
            })
        }
        catch (err) {
            res.status(400).json({ "status": err.message });
        }
    }
    else {
        res.status(400).json({ "status": err.message });
    }
});

module.exports = cityRoute;