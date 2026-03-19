const dotenv = require('dotenv')
dotenv.config();

const express = require('express')

const app = express() // making the server
const cors = require('cors') 

const conneectToDb = require('./db/db')

// require the user routes for performing the operations on the user
const userRoutes = require('./routes/user.routes')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const cookiesParser = require('cookie-parser') // for parsing the cookies from the request header

conneectToDb(); // calling the database creation file 


app.use(cors()) // for know am let accept request from all place.

app.use(express.json()) // for parsing the json data from the request body.
app.use(express.urlencoded({ extended: true })) // for parsing the urlencoded data from the request body.

app.use(cookiesParser()) // for parsing the cookies from the request header

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // for using the swagger

// dummy api for testing the our setup 
app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use('/api/users', userRoutes) // for using the user routes for performing the operations on the user. when the user hit the /api/users/register endpoint then the registerUser function from the userController maii registerUser will be called.

module.exports = app; // app is the variable 