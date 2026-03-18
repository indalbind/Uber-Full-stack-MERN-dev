/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: object
 *                 properties:
 *                   firstname:
 *                     type: string
 *                     example: indal
 *                   lastname:
 *                     type: string
 *                     example: bind
 *               email:
 *                 type: string
 *                 example: indal@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 * 
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: indal@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 * 
 */



const express = require("express");
const router = express.Router(); // for creating the router

const { body } = require("express-validator"); // for validating the request body from express-validator package

const userController = require("../controllers/user.controller"); // importing the user controller for performing the operations on the user

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


module.exports = router; // exporting the router for using in the app.js file
