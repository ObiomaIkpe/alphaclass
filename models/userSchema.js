const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


// const User = require('../models/userModel');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // validate: {
        //     validator: function (v) {
        //         return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid email!`
        // }
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, 
    },
    dateOfBirth: {
        type: Date,
        default: Date.now,
    },
    gender: {
        type: String,
    enum: ['male', 'female', 'other'],
    lowercase: true,
    },
    // Account Status
  isActive: {
    type: Boolean,
    default: true,
  },
  role:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    lowercase: true,
  },

}, {timestamps: true});


userSchema.pre('save', async function(next) {

})

userSchema.methods.comparePassword = async function(candidatePassword, userPassword) 
    {    
    return await bcrypt.compare(candidatePassword, userPassword);
}


const User = mongoose.model('User', userSchema);

module.exports = User;
