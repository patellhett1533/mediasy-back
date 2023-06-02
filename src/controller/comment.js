const Post = require('../model/Post');
const User = require('../model/User');
const Notify = require('../model/Notify');

exports.postComment = async (req, res) => {
    const { text } = req.body;
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);

    if (!text) {
        res.status(400).json({ message: "Empty data not allowed" })
    }
    else {

        const PostComment = await post.updateOne({
            $push: {
                comment: [
                    {
                        user,
                        text
                    }
                ]
            }
        })
        if (PostComment) {
            const text1 = " commented on your post";
            const img = post.postPicture[0].img;

            const notify = new Notify({
                self: user,
                receipent: post.createdBy,
                text: text1,
                img,
                role: "images"
            });

            await notify.save((err) => {
                if (err) {
                    res.status(400).json(err);
                }
            })
        }
        res.status(200).json({ message: "comment posted successfully" })
    }
}

exports.getComment = async (req, res) => {
    if (req.params.id !== null) {
        const comments = await Post.findById(req.params.id);

        if (comments) {
            res.status(200).json(comments.comment)
        }
        else {
            res.status(400).json({ message: "Don't fetch comments" })
        }
    }

}

exports.deleteComment = async (req, res) => {
    const postId = req.params.id;
    const { commentId, text } = req.body;

        const post = await Post.findById(postId);

        if(post){
            if(post.comment._id == req.user._id){
                await post.updateOne({
                    $pull: {
                        comment:{ _id : commentId }
                    }
                });
        
                if (postDelete) {
                    const deleteNotify = await Notify.deleteOne({
                        self: req.user._id,
                        receipent: post.createdBy,
                        text
                    });
                }
                res.status(200).json({message: "deleted successfully"})
            }
            else{
                res.status(400).json({message: "You can't delete comment"})
            }
        
    }
    else{
        res.status(400).json({message: "Unable to find user"})
    }
    
}