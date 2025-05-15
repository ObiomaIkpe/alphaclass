const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespace
    },
    make: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900, // Basic validation for a reasonable year
        max: new Date().getFullYear() // Ensure year is not in the future
    },
    available: {
        type: Boolean,
        default: true //  Set default value to true
    },
    color: {
        type: String,
        trim: true,
        default: 'Unknown'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Car = mongoose.model('Car', carSchema);
module.exports = Car;