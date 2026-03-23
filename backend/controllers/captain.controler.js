const captainModel = require("../models/captain.model")
const captainService = require("../services/captain.service") // importing the captain service for performing the operations on the captain
const { validationResult } = require("express-validator");
const BlacklistToken = require('../models/blacklistToken.model') // importing the blacklist token model for performing the operations on the blacklist token

module.exports.registerCaptain = async (req, res) => {
    const error = validationResult(req) // all error go in the req and we will check the error by using the validationResult function from the express-validator package.

    if (!error.isEmpty()) { // mean's if there is any error in the request body then we will return the error to the user.
        return res.status(400).json({ errors: error.array() }) // if there is any error in the request body then we will return the error to the user.
    }

    const { fullname, email, password, vehicle } = req.body; // destructuring the request body for getting the fullname,email,password,vehicle from the request body.

    // extra check if the captain already exist with this email so we have to say already registerd. 
    const isCaptainExist = await captainModel.findOne({ email }) // for finding the captain in the database by email.

    if (isCaptainExist) {
        // mean's if there is already a captain with this email then we will return the error to the user.
        return res.status(400).json({ message: "Captain with this email already exists" }) // if there is already a captain with this email then we will return the error to the user.
    }

    const captain = await captainService.createCaptain({// mean's registerCaption function run with given parameter.
        firstname: fullname?.firstname,
        lastname: fullname?.lastname,
        email,
        password,
        color: vehicle?.color,
        plate: vehicle?.plate,
        capacity: vehicle?.capacity,
        vehicleType: vehicle?.vehicleType,
    }); // for creating the captain in the database and then we will return the token to the captain for authentication.

    const token = captain.generateAuthToken() // for generating the token for the captain when he login or register.

    res.status(201).json({ token, captain }) // for sending the token to the captain for authentication.
}
 
module.exports.loginCaptain = async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() })
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password') // for finding the captain in the database by email and we will select the password field for comparing the password when the captain login.

    if (!captain) {
        // mean's if there is no captain with this email then we will return the error to the user.
        return res.status(400).json({ message: "Invalid email or password" }) // if there is no captain with this email then we will return the error to the user.
    }

    const isPasswordMatch = await captain.comparePassword(password) // for comparing the password when the captain login.

    if (!isPasswordMatch) {
        // mean's if the password is not match then we will return the error to the user.
        return res.status(400).json({ message: "Invalid email or password" }) // if the password is not match then we will return the error to the user.
    }

    const token = captain.generateAuthToken() // for generating the token for the captain when he login or register.

    res.cookie('token', token, { httpOnly: true, secure: true }) // for setting the token in the cookie for authentication.

    res.status(200).json({ token, captain }) // for sending the token to the captain for
}


module.exports.getCaptainProfile = async (req, res) => {
    // Now we have to make the middileware so that we can get the user from the token and then we can send the user profile to the user. and if the user is not authenticated then we will return the error or you not able to access this route.
    res.status(200).json({ captain: req.captain });
}


module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // for getting the token from the cookie which we have set in the login route.
    
    if (!token) {
        // mean's if there is no token in the cookie then we will return the error to the user.
        return res.status(400).json({ message: "No token provided" }); // if there is no token in the cookie then we will return the error to the user.
    }

    // for blacklisting the token so that the user can not use the same token for authentication.
    await BlacklistToken.create({ token });

    // for removing the token from the cookie.
    res.clearCookie('token');

    res.status(200).json({ message: "You have been logged out successfully." });
}