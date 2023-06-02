const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    otp: String,
    createdAt: Date,
    expiredAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Otp', otpSchema);