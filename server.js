const express = require("express");
const app = express();

require("dotenv").config();




const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParserErrorHandler = require('express-body-parser-error-handler');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8001;


//ALL ROUTERS
// const propertyRouter = require("./routes/property");

const userRoute = require("./routes/user");

//  const userRouter = require("./routes/user");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

//using express-body-parser-error-handler to handle the error incase of invalid json received
app.use(bodyParserErrorHandler());


//DB CONNECTION
const connection = require("./db/connection");
const propertyRoute = require("./routes/propertyRoute");
connection();

app.use("/property", propertyRoute);
app.use("/user", userRoute);

app.use("/*", (req, res) => {
    res.status(404).json({
        "status" : "route not found"
    })
})
// =======
// app.use("/", propertyRouter);

// app.use("/", userRouter);

mongoose.connection.once('open', () => {

    console.log('connected to DB');

    //launching the server
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`);
    });

});
// app.listen(PORT || process.env.PORT, () => { console.log(`server started at PORT ${PORT}`) })

