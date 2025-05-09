const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userVerificationSchema = new mongoose.Schema({
  // Reference to the User model
  user: {
    type: ObjectId,
    required: true,
    unique: true, // Ensures one-to-one relationship
    ref: 'User', // Name of the User model
  },
  bvn: {
    type: String,
    trim: true,
    unique: true,
  },
  picture: {
    type: String, 
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    lowercase: true,
  },
  verificationNotes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserVerification = mongoose.model('UserVerification', userVerificationSchema);

module.exports = UserVerification;