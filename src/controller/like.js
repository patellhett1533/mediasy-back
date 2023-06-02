const Post =  require('../model/Post');
const User = require('../model/User');
const Notify = require('../model/Notify');

exports.likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user._id);
    
    if(!post.like.includes(req.user._id)){
        await post.updateOne({ $push: { like: req.user._id } })

        const text = " liked your post";
            const img = post.postPicture[0].img;

            const notify = new Notify({
                self: user,
                receipent: post.createdBy,
                text,
                img,
                role:"images"
            });

            await notify.save((err, data) => {
                if(err){
                    res.status(400).json(err);
                }
            })

        res.status(200).json({message : "Liked"})
    }
    else{
        await post.updateOne({ $pull: { like: req.user._id } })

        res.status(200).json({message: "Like"})
    }
}

exports.isLike = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if(post.like.includes(req.user._id)){
        res.status(200).json({message : "Liked"})
    }
    else{
        res.status(200).json({message : "Like"})
    }
}