const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postPicture: [
        {
            img: {
                type: String
            }
        }
    ],
    discription: {
        type: String,
        required: true
    },
    like: {
        type: Array,
        default: []
    },
    comment: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId
            },
            text: {
                type : String
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);