const express = require("express");
const router = express.Router(); // for creating the router

const { body } = require("express-validator"); // for validating the request body from express-validator package

const userController = require("../controllers/user.controller"); // importing the user controller for performing the operations on the user

const authMiddleware = require('../middlewares/auth.middleware') // importing the auth middleware for performing the authentication of the user

router.post(
    "/register",
    [
        // fullname is the object so we need to validate the firstname and lastname separately by . thing.
        body("fullname.firstname")
            .isString()
            .withMessage("firstname should be string")
            .isLength({ min: 3 })
            .withMessage("firstname should be at least 3 characters"),

        body("fullname.lastname")
            .isString()
            .withMessage("lastname should be string")
            .isLength({ min: 3 })
            .withMessage("lastname should be at least 3 characters"),

        body("email")
            .isEmail()
            .withMessage("Please use a valid email address.")
            .isLength({ min: 5 })
            .withMessage("email should be at least 5 characters"),

        body("password")
            .isString()
            .withMessage("password should be string")
            .isLength({ min: 6 })
            .withMessage("password should be at least 6 characters"),
    ],
    userController.registerUser,
); // for registering the user

// userController.registerUser mean's when the user hit the /register endpoint then the registerUser function from the userController maii registerUser will be called.


// creating the login rotues
router.post('/login', [
    body("email").isEmail().withMessage("Please use a valid email address.").isLength({ min: 5 }).withMessage("email should be at least 5 characters"),
    body("password").isString().withMessage("password should be string").isLength({ min: 6 }).withMessage("password should be at least 6 characters"),
], userController.loginUser) // for login the user


router.get('/profile' , authMiddleware.authUser, userController.getUserProfile) // for getting the user profile


module.exports = router; // exporting the router for using in the app.js file
