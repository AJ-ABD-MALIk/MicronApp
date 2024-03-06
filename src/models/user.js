let mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        default: ""
    },

    lastname: {
        type: String,
        default: ""
    },

    password: String
});

// Creating a Model
let user = mongoose.model('User', userSchema, 'users');

// Exporting the user model
module.exports = user;
