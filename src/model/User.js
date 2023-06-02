const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    verified:{
        type: Boolean,
        default: false
    },
    following: {
        type: Array,
        default: []
    },
    follower: {
        type: Array,
        default: []
    },
    posts: {
        type: Array,
        default: []
    },
    saved: {
        type: Array,
        default: []
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
       type: String,
       default: "default.png"
    }
    
}, {timestamps: true});

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}


module.exports = mongoose.model('User', userSchema);