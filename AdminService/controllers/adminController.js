// adminController.js

const adminModel = require("../model/adminModel");
const Admin = require("../model/adminModel"); // Import the Admin model
const bcrypt = require("bcrypt");

// Signup function
module.exports.signup = async (req, res, next) => {
  try {
    const email = 'admin@gmail.com'
    const password = '123'
    const username = 'admin'
    // const { email, password, username } = req.body;
   
    const status = "true"

    const user = await adminModel.create({ email, password});


    res.status(201).json({ user: user});
    
  } catch (err) {
    console.log(err);

    res.json({ errors, created: false });
  }
};

// Login function

// Login function
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await adminModel.login(email, password);

    console.log(user);

    res.status(201).json({ user: user,login:true});
  } catch (err) {
    console.log(err);
    res.json({ err, created: false ,login:false});
  }
};


// Forgot password function
exports.forgotPassword = async (req, res) => {
  // Logic for handling forgot password
};

// Update password function
exports.updatePassword = async (req, res) => {
  // Logic for updating password
};
