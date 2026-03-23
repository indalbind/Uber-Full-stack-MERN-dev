const express = require("express")
const router = express.Router()
const captainController = require("../controllers/captain.controler") // importing the captain controller for performing 
// creating the API for register the captain
const { body } = require('express-validator') // for validating the request body from express-validator package
const Middleware = require('../middlewares/captain.middleware') // importing the auth middleware for performing the authentication of the captain

router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('firstname is required').isLength({ min: 3 }).withMessage('firstname should be at least 3 characters'),

    body('fullname.lastname').optional().isLength({ min: 3 }).withMessage('lastname should be at least 3 characters'),

    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('Please use a valid email address.').isLength({ min: 5 }).withMessage('email should be at least 5 characters'),

    body('password').notEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('password should be at least 6 characters'),

    body('vehicle.color').notEmpty().withMessage('color is required').isLength({ min: 3 }).withMessage('color should be at least 3 characters'),

    body('vehicle.plate').notEmpty().withMessage('plate is required').isLength({ min: 3 }).withMessage('plate should be at least 3 characters'),

    body('vehicle.capacity').notEmpty().withMessage('capacity is required').isInt({ min: 1 }).withMessage('capacity should be at least 1'),

    body('vehicle.vehicleType').notEmpty().withMessage('vehicleType is required').isIn(['car', 'motorcycle','auto']).withMessage('vehicleType should be car, motorcycle or auto')
], captainController.registerCaptain) // when the user hit the /api/captains/register endpoint then the registerCaptain function from the captainController maii registerCaptain will be called.


router.post('/login', [
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('Please use a valid email address.').isLength({ min: 5 }).withMessage('email should be at least 5 characters'),

    body('password').notEmpty().withMessage('password is required').isLength({ min: 6 }).withMessage('password should be at least 6 characters'),
], captainController.loginCaptain) // when the user hit the /api/captains/login endpoint then the loginCaptain function from the captainController will be called.

router.get('/profile', Middleware.authCaptain, captainController.getCaptainProfile) // when the user hit the /api/captains/profile endpoint then the getCaptainProfile function from the captainController will be called.

router.post('/logout', Middleware.authCaptain, captainController.logoutCaptain) // when the user hit the /api/captains/logout endpoint then the logoutCaptain function from the captainController will be called.


module.exports = router