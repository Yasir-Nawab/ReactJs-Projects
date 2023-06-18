const express = require('express');
const User = require('../models/User');
const router = express.Router();
// requiring Validation
const { body, validationResult } = require('express-validator');
// bcrypt for hashing password and adding salt
const bcrypt = require('bcrypt');
// jsonwebtoken for genrating token to login user
const jwt = require('jsonwebtoken');
// require fetchuser middleware
const fetchuser = require("../middleware/fetchuser");

// this is a secret sign require for web token
const JWT_SECRET = 'Yasirisagoodb$oy';


// ROUTE 1: CREATE A USER
router.post('/createUser',[
    // Adding some validations
    body('name').isLength({min:3}), // the length of name value must be atleast 3 characters
    body('email').isEmail(), // check wheater the value of email is email type
    body('password').isLength({min:5}), //the length of password value must be atleast 5 characters
] ,async(req,res)=>{
    //If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!(result.isEmpty())) {
        res.send({ errors: result.array() });
    }
    try {
        // check whether the email is unique or not
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"User with the same email already exist"});
        }

        // generating and adding salt with password
        const salt = await bcrypt.genSalt(10);
        // hashing password and with salt
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name:req.body.name,
            password:secPass,
            email:req.body.email,
        });
        // json web token verify data of user through secret sign
        // id of the user is data here
        const data = {
            user: {
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(authtoken);
        // res.json(user);
        res.json({authtoken});


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    // .then(user => res.json(user)).catch(err => {console.log(err)
    // res.json({err:"Please Enter Unique Email Address",message:err.message})});
});


// ROUTE 2: AUTHENTICATE A USER
//User Login
router.post('/login',[
    // Adding some validations
    body('email','Enter a valid email').isEmail(), // check wheater the value of email is email type
    body('password','Password cannot be blank').exists(), //password should not be blank
] ,async(req,res)=>{
    //If there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!(result.isEmpty())) {
        res.send({ errors: result.array() });
    }
    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({error:"please try to login with correct credentials"});
        }

        // hashing entered password and then comparing entered password with the password stored in database
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({error:"please try to login with correct credentials"});
        }

        const data = {
            user: {
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


// ROUTE 3: GET LOGGED IN USER DETAILS
// fetchuser is a middleware function
router.post('/getuser', fetchuser ,async(req,res)=>{

    try { 
        userID = req.user.id;
        // "-password": fetch all data of a user except password
        const user = await User.findById(userID).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})
module.exports = router