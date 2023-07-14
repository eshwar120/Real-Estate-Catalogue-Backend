const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user_info');
const jwt = require('jsonwebtoken');

userRoute.post('/signup', async (req, res) => {
    const userData = req.body;
    if (userData) {
        console.log(req.body)
        try {
          if(userData.password !== userData.confirmPassword){
            return res.status(400).json({"message": "password is not matching"})
          }

            const doesUserExist = await User.findOne({email : userData.email});
            if(doesUserExist) throw new Error('User already exists')
            
            const encryptedPassword = bcrypt.hashSync(userData.password, 15);
            const data = new User({
                email: userData.email,
                password: encryptedPassword
            });
            await data.save();
            res.status(201).json({ "message" : "User created successsfully" });
        }
        catch (err) {
            res.status(409).json({ "message" : err.message });
        }
    }
    else {
        res.status(400).json({ "message": "Sign up failed" });
    }
});

userRoute.post('/signin', async (req, res) => {
    const userData = req.body;
    console.log(userData)
    if (userData) {
        try {
            const userDataFromDB = await User.findOne({ email: userData.email });
            if (userDataFromDB) {
                // console.log(userDataFromDB)
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
                    res.status(200).json({ 
                        "message": "success" ,
                        email: userDataFromDB.email,
                        id: userDataFromDB.id,
                        "token" : accessToken
                    });
                }
                else {
                    res.status(401).json({ "messsage": "failed" });
                }
            }
            else {
                res.status(401).json({ "message": "failed" });
            }
        }
        catch (err) {
            res.status(401).json({ "message": err.message });
        }
    }
    else {
        res.status(401).json({ "message": "failed" });
    }
});

module.exports = userRoute;


// const express = require('express');
// const jwt = require('../middlewares/jwt');
// const connection = require('../db/connection');
// const upload = require('../middlewares/multer');
// const mongoose = require('mongoose');

// const app = express();

// app.use(express.json());


// const userSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   password: { type: String, required: true }
// });

// const User = mongoose.model('User', userSchema);

// app.post('/signin', async (req, res) => {
//   const { userId, password } = req.body;

//   try {
//     const user = await User.findOne({ userId });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials. Sign-in failed.' });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials. Sign-in failed.' });
//     }

    
//     const token = jwt.generateToken();

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// app.post('/signup', upload, async (req, res) => {
//   const { userId, password, confirmPassword } = req.body;

//   try {
//     const existingUser = await User.findOne({ userId });

//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists.' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }
//     const newUser = new User({
//       userId,
//       password
//     });

//     await newUser.save();


//     const token = jwt.generateToken();

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

// connection();




// const express = require('express');
// const jwt = require('jsonwebtoken');
// const connection = require('../db/connection');
// const upload = require('../middlewares/multer');
// const mongoose = require('mongoose');

// const userRouter = express.Router();

// // const app = express();

// // userRouter.use(express.json());

// const userSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   password: { type: String, required: true }


// const app = express();

// app.use(express.json());

// const userSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   password: { type: String, required: true },
  

// });

// const User = mongoose.model('User', userSchema);

// userRouter.post('/signin', async (req, res) => {
//   const { userId, password } = req.body;
//   console.log(req.body)

// app.post('/signin', async (req, res) => {
//   const { userId, password } = req.body;


//   try {
//     const user = await User.findOne({ userId });

//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials. Sign-in failed.' });
//     }

//     const token = generateToken();
                

//     res.json({ token });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// userRouter.post('/signup', upload, async (req, res) => {
//   const { userId, password, confirmPassword } = req.body;

//   try {
//     const existingUser = await User.findOne({ userId });

//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists.' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     const newUser = new User({
//       userId,
//       password
//     });

//     await newUser.save();

//     // const token = generateToken();

//     res.status(201).json({ status : "success", message : "SignedUp successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// });

// const generateToken = () => {
//   const payload = {
//     data: {
//       userId: '123456789',
//       email: 'exampleUser'
//     }
//   };

//   const secretKey = process.env.SECRET_KEY;
//   const token = jwt.sign(payload, secretKey);

//   return token;
// };

// module.exports = userRouter;






// app.post('/signup', upload, async (req, res) => {
//   const { userId, password, confirmPassword } = req.body;

//   try {
//     const existingUser = await User.findOne({ userId });

//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists.' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match.' });
//     }

//     const newUser = new User({
//       userId,
//       password
//     });

//     await newUser.save();
//     console.log(newUser)
//     const token = generateToken();

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// const generateToken = () => {
//   const payload = {
//     data: {
//       userId: '123456789',
//       email: 'exampleUser'
//     }
//   };

//   const secretKey = process.env.SECRET_KEY;
//   const token = jwt.sign(payload, secretKey);

//   return token;
// };

// module.exports = app;


// const express = require("express")
// const router = express.Router()
// const bcrypt = require("bcrypt")
// const dotenv = require("dotenv")
// const usermodel = require("../models/user_info")
// const cors = require("cors")
// const jwt = require("jsonwebtoken")


// const salt = 10;
// dotenv.config()
// router.use(cors());

// //ALL USER
// router.get('/alluser', async (req, res) => {
//     try {
//         const data = await usermodel.find();
//         res.status(200).json({
//             status: "success",
//             data
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: "failed",
//             message: err.message
//         })
//     }
// })

//NEW USER
// router.post("/signup", async (req, res) => {
//     try {
//         const { email, password, confirmpassword } = req.body;
//         if (!email || !password || !confirmpassword) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "All fields are mandatory",
//             });
//         }
//         const present = await usermodel.findOne({ email });
//         if (present) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "User already registered",
//             });
//         }
//         if (password !== confirmpassword) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "Passwords do not match",
//             });
//         }
//         //HASHING PASSWORD
//         bcrypt.hash(password, salt, async function (err, hash) {
//             if (err) {
//                 return res.status(400).json({
//                     mesaage: err.message
//                 })
//             }
//             //INSERTING NEW USER
//             const userData = await usermodel.create({
//                 email:email,
//                 password: hash
//             })
//             return res.status(200).json({
//                 message: "success",
//                 userData
//             })

//         });
//     } catch (e) {
//         return res.status(500).json({
//             mesaage: "failed"
//         })
//     }
// })


// //Signin
// router.post("/signin", async (req, res) => {
//     try {
//       console.log(req.body);
//         const { email, password } = req.body
//         if (!email || !password) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "All fields required"
//             })
//         }
//         const data = await usermodel.findOne({ email })
//         console.log(data)
//         if (!data) {
//             return res.status(400).json({
//                 status: "failed",
//                 message: "user not registered"
//             })
//         }
//         console.log(data);
//         bcrypt.compare(password, data.password, function (err, result) {
//             if (err) {
//                 return res.status(400).json({
//                     status: "failed",
//                     message: err.message
//                 })
//             }
//             if (result) {
//                 const token = jwt.sign({
//                     payload: data._id
//                 }, process.env.SECRET_KEY);
//                 return res.status(200).json({
//                     status: "success",
//                     message: "Login Succesfull",
//                     token,
//                     id: data._id
//                 })
//             } else {
//                 return res.status(400).json({
//                     status: "failed",
//                     message: "not a valid password"
//                 })
//             }
//         });
//     } catch (error) {
//         return res.status(400).json({
//             status: "failed",
//             message: error.message
//         })
//     }
// })


// module.exports = router
// >>>>>>> master


