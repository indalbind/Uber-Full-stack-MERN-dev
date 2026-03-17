const dotenv = require('dotenv')
dotenv.config();

const express = require('express')

const app = express() // making the server
const cors = require('cors') 

app.use(cors()) // for know am let accept request from all place. 

// dummy api for testing the our setup 
app.get('/', (req, res) => {
    res.send("Hello world")
})


module.exports = app; // app is the variable 