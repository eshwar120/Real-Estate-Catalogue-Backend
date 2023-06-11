const { Schema , model } = require('mongoose');


const City = new Schema({
    cityName: {type : String, required: true},
    area: [{type : String, required: true}],
    pincode: [{type : String, required: true}],
})

module.exports = model('cities' , City);