const Captain = require('../models/captain.model'); // import the captain model to use it in the middleware

const jwt = require('jsonwebtoken') // for creating the token
const userService = require('../services/user.service') // importing the user service for performing the operations on the user
const bcrypt = require('bcrypt') // for hashing the password


module.exports.authCaptain = async (req, res, next) => {

    // here first we have to check the token from header or cookies. now once we got the token then we have to verify the token and then we will get the user id from the token and then we will find the user in the database by using the user id and then we will attach the user to the request object and then we will call the next function for moving to the next middleware or controller.
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // for getting the token from header or cookies. we can get the token from header by using req.headers.authorization and we can get the token from cookies by using req.cookies.token. and also we have to split the token because the token is in the format of "Bearer token" so we have to split it by space and then we will get the token.

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const isBlacklisted = await Captain.findOne({token: token}); // for checking the token is blacklisted or not in the blacklist token collection. if the token is blacklisted then we will return the error to the user.

    if (isBlacklisted) {
        return res.status(401).json({ message: "Access denied. Token is blacklisted." });
    }

// if we got the token then we have to decode the token and after decoding we will get the data in token which we using to create the token where in usermodel we have did like jwt.sign({ _id: this._id } mean's we create the token with the _id(user_id) so when we decode we only get the id in the token.
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoded is only the user_id.
        
        const captain = await Captain.findById(decoded._id)

        if (!captain) {
            return res
                .status(401)
                .json({ message: "Unauthorized. Captain not found." });
        }

        req.captain = captain; // mean's request object ma user(user_id) attach kar diya taki hum next middleware ya controller ma user(user_id) ko access kar sake.
        return next(); // for moving to the next middleware or controller.

    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
}   


