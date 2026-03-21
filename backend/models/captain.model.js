// This file conten the model of the captain

const mongoose = require("mongoose")

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'firstname should be at least 3 characters']
        },
        lastname: {
            type: String,
            required: false,
            minlength: [3, 'lastname should be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
        minlength: [5, 'email should be at least 5 characters']
    },
    password: {
        type: String,
        required: true,
        select: false, // for not showing the password in the response
        
        minlength: [6, 'password should be at least 6 characters']
    },

    // we nead socketId for know which user is online and which is offline.
    socketId: {
        type: String,
    }
})

module.exports = mongoose.model("Captain", captainSchema)

