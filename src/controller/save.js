const User = require("../model/User")
const Post = require("../model/Post")

exports.savePost = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user.saved.includes(req.params.id)) {
        await user.updateOne({ $push: { saved: req.params.id } })
        res.status(200).json({ message: "saved" });
    }
    else {
        await user.updateOne({ $pull: { saved: req.params.id } })
        res.status(400).json({ message: "save" })
    }
}

exports.checkSaved = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user.saved.includes(req.params.id)) {
        res.status(200).json({ message: "saved" });
    }
    else {
        res.status(400).json({ message: "save" })
    }
}

exports.getSavePost = async (req, res) => {
    const user = await User.findById(req.user._id);

    const post = await Post.find({_id : user.saved});

    if(post){
        res.status(200).json(post);
    }
    else{
        res.status(400).json({message: "No save any post"})
    }
}