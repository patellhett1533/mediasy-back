const User = require('../model/User');

exports.editProfile = async (req, res) => {
    if(req.body.firstname && req.body.lastname){
        await User.findByIdAndUpdate(req.user._id , {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })
    }

    if(req.body.username){
        let isUsername = await User.find({username : req.body.username});
        if(isUsername.length > 0){
            if(isUsername[0]._id != req.user._id){
                res.status(400).json({error: "error", message: "This Username is used by someone else."})
            }
            else{
                res.status(200).json({message: "username was same."})
            }
        }
        else{
            await User.findByIdAndUpdate(req.user._id, {
                username: req.body.username
            })
            res.status(200).json({messgae: "Username was changed"})
        }
        
    }

    if(req.body.bio){
        await User.findByIdAndUpdate(req.user._id, {
            bio: req.body.bio
        })
    }

    if(req.file){
        await User.findByIdAndUpdate(req.user._id, {
            profilePic: req.file.filename
        })
    }
    
}

exports.getProfile = async (req, res) => {

    const userData = await User.findById(req.user._id);

    res.status(200).json(userData);

}

exports.getUserId = async (req, res) => {

    const user = await User.find({username : req.params.uname});
    
    if(user){
        res.status(200).json({message: user});
    }
    else{
        res.status(400).json({message : "not"});
    }
}

exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
}