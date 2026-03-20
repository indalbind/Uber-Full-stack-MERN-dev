const mongoose = require('mongoose')
const bcrypt = require("bcrypt"); // for hashing the password
const jwt = require('jsonwebtoken') // for creating the token


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String, // mean's this field should be string
            required: true, // mean's this field is must be filled
            minlength: [3, 'firstname should be at least 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3, 'lastname should be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, 
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

// for genetrating the token for the user when he login or register.
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
    }); // _id: this._id mean's we are taking the _id and only id store in the token 
    return token;
};

// for comparing the password when the user login.
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// for hashing the password before saving the user to the database.
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};


const User = mongoose.model('User', userSchema); // mean's the collection name is User and the schema is userSchema

module.exports = User; // exporting the User model to use it in other files.