const User = require('../models/user.model') // importing the user model for performing database operations
const jwt = require('jsonwebtoken') // for creating the token
const userService = require('../services/user.service') // importing the user service for performing the operations on the user
const { validationResult } = require('express-validator') // for validating the request body from express-validator package

// creating the API for register the user

module.exports.registerUser = async (req, res, next) => {
    // here we write the code for register the user and also we need to validate the request body before registering the user.

    const errors = validationResult(req) // all error go in the req and we will check the error by using the validationResult function from the express-validator package.

    if (!errors.isEmpty()) { // mean's if there is any error in the request body then we will return the error to the user.
        return res.status(400).json({ errors: errors.array() }) // if there is any error in the request body then we will return the error to the user.
    }

    // if every thing ok so we move forward for creating the user in the database and then we will return the token to the user for authentication.
    const { fullname, email, password } = req.body; // destructuring the request body for getting the fullname,email,password from the request body.

    const user = await userService.createUser({ 
        firstname: fullname?.firstname,
        lastname: fullname?.lastname,
        email, 
        password 
    }) // for creating the user in the database and then we will return the token to the user for authentication.

    const token = user.generateAuthToken() // for generating the token for the user when he login or register.

    res.status(201).json({ token,user}) // for sending the token to the user for authentication.
    
}


module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req); // all error go in the req and we will check the error by using the validationResult function from the express-validator package.

    if (!errors.isEmpty()) {
        // mean's if there is any error in the request body then we will return the error to the user.
        return res.status(400).json({ errors: errors.array() }); // if there is any error in the request body then we will return the error to the user.
    }

    const { email, password } = req.body; // destructuring the request body for getting the email,password from the request body.

    const user = await User.findOne({ email }).select("+password"); // for finding the user in the database by email and also we need to select the password because we have set select: false in the user model for not showing the password in the response.

    if (!user) {
        // mean's if there is no user with this email then we will return the error to the user.
        return res.status(401).json({ message: "Invalid email or password" }); // if there is no user with this email then we will return the error to the user.
    }

    const isMatch = await user.comparePassword(password); // for comparing the password when the user login. the compair password function is defined in the user model for comparing the password when the user login.

    if (!isMatch) {
        // mean's if the password is not match then we will return the error to the user.
        return res.status(401).json({ message: "Invalid email or password" }); // if the password is not match then we will return the error to the user.
    }

    const token = user.generateAuthToken(); // for generating the token for the user when he login or register.

    res.cookie('token', token, { httpOnly: true, secure: true }); // for setting the token in the cookie for authentication. httpOnly: true mean's the cookie can not be accessed by the client side javascript and secure: true mean's the cookie will only be sent over https.

    res.status(200).json({ token, user }); // for sending the token to the user for authentication.
};       


module.exports.getUserProfile = async (req, res, next) => {
    // Now we have to make the middileware so that we can get the user from the token and then we can send the user profile to the user. and if the user is not authenticated then we will return the error or you not able to access this route.

    res.status(200).json({ user: req.user }) // req.user is the user which we get from the token in the auth middleware and we have attached the user to the request object in the auth middleware so that we can access the user in the controller and then we will send the user profile to the user.
}