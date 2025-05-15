const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference the User model
        ref: 'User', //  Define the reference to the User model
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId to reference the Car model
        ref: 'Car', // Define the reference to the Car model
        required: true
    },
    bookingDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    returnDate: { // Add return date
        type: Date,
        required: false // Make it optional, or set a default if needed
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending', // Set default status
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const carBooking = mongoose.model('Booking', bookingSchema);
module.exports = carBooking;