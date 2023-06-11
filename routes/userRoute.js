const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken')

userRoute.post('/register', async (req, res) => {
    const userData = req.body;
    if (userData) {
        // console.log(req.body)
        try {
            const encryptedPassword = bcrypt.hashSync(userData.password, 15);
            const data = new User({
                name: userData.name,
                email: userData.email,
                password: encryptedPassword
            });
            await data.save();
            res.status(201).json({ "status": "success" });
        }
        catch (err) {
            res.status(400).json({ "status": err.message });
        }
    }
    else {
        res.status(400).json({ "status": "failed" });
    }
});

userRoute.post('/login', async (req, res) => {
    const userData = req.body;
    if (userData) {
        try {
            const userDataFromDB = User.findOne({ email: userData.email });
            if (userDataFromDB) {
                const match = bcrypt.compareSync(userData.password , userDataFromDB.password);
                if (match) {
                    //generating accessToken
                    const accessToken = jwt.sign(
                        {
                            id: userDataFromDB._id,
                            email: userDataFromDB.email,
                        },
                        process.env.ACCESS_TOKEN_KEY,
                        { expiresIn: "20m" }
                    );
            
                    //generating refresh token
                    const refreshToken = jwt.sign(
                        {
                            email: userDataFromDB.email,
                            id: userDataFromDB._id,
                        },
                        process.env.REFRESH_TOKEN_KEY,
                        { expiresIn: "7d" }
                    );
            
                    //saving refresh token to DB
                    await User.updateOne({_id : userDataFromDB._id} , {$push : {refreshToken : refreshToken}});
            
                    // Creates Secure Cookie with refresh token
                    res.cookie("jwt", refreshToken, {
                        httpOnly: true,
                        // secure: true,
                        sameSite: "none",
                        maxAge: 24 * 60 * 60 * 1000,
                    });
            
                    //send authToken back
                    res.status(200).json({ accessToken });
                    res.status(201).json({ 
                        "status": "success" ,
                        "token" : accessToken
                    });
                }
                else {
                    res.status(401).json({ "status": "failed" });
                }
            }
            else {
                res.status(401).json({ "status": "failed" });
            }
        }
        catch (err) {
            res.status(401).json({ "status": err.message });
        }
    }
    else {
        res.status(401).json({ "status": "failed" });
    }
});

module.exports = userRoute;