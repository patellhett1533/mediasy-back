const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
    self: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    receipent: [mongoose.Types.ObjectId],
    text: String,
    img: String,
    role: String,
    isReade: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Notify', notifySchema);