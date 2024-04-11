const mongoose = require('mongoose');

// Destructure Schema from mongoose
const { Schema } = mongoose;

// Define the User schema using mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create a model from the User schema and export it
module.exports = mongoose.model('user', UserSchema);
