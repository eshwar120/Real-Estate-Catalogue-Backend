const express = require('express');
const app = express();
const bodyParserErrorHandler = require('express-body-parser-error-handler');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/connectDB');
require('dotenv').config();

//checking for PORT in env
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//appying body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//using express-body-parser-error-handler to handle the error incase of invalid json received
app.use(bodyParserErrorHandler());

//usnig coooki-parser to get and pass the refresh token
app.use(cookieParser());

//conneting to MongoDB
connectDB();


//sending 404 for routes out of our scope
app.use('/*', (req, res) => {
    res.status(404).json({ status: "Not found" });
});


//checking if connected to MongoDB successfully and launchingb server on successful connection
mongoose.connection.once('open', () => {

    console.log('connected to DB');

    //launching the server
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });

});

module.exports = app;