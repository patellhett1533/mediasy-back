const Post = require('../model/Post');
const User = require('../model/User');

// for create a new post
exports.post = (req, res) => {

    const { discription } = req.body;
    let postPicture = [];

    if (req.files) {
        postPicture = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const _post = new Post({
        createdBy: req.user._id,
        postPicture,
        discription
    });

    _post.save((error, post) => {
        if (error) {
            res.status(400).json({ error })
        }

        if (post) {
            res.status(201).json({ post })
        }
    })

}

// for fetch all posts
exports.allPost = async (req, res) => {

    const user = await User.findById(req.user._id);

    let posts = await Post.find({createdBy: user.following});

    if (!posts) {
        res.status(400).json({ message: "You havn't follow any account" })
    }
    else {
        res.status(200).json({ posts });
    }
}

//   for edit a existing post
exports.editPost = async (req, res) => {
    const postId = req.params.id;
    const { discription } = req.body;

    const isPost = await Post.findById(postId);
    if (req.user._id == isPost.createdBy) {
        let posts = await Post.findByIdAndUpdate(postId, {
            discription
        });

        if (!posts) {
            res.status(400).json({ message: "Unable to update your post" });
        }
        else {
            res.status(200).json({ posts })
        }
    }
    else{
        res.status(400).json({message: "Access Denied"});
    }


}

//   for fetch a specific post
exports.getPost = async (req, res) => {
    const postId = req.params.id;

    let post = await Post.findById(postId);

    if (!post) {
        res.status(400).json({ message: "Please try again" });
    }
    else {
        res.status(200).json({ post });
    }
}

// for deleting a post
exports.deletPost = async (req, res) => {
    const postId = req.params.id;

    const isPost = await Post.findById(postId);
    if (req.user._id == isPost.createdBy){
    let post = await Post.findByIdAndRemove(postId);

    if (!post) {
        res.status(400).json({ message: "Please try again" });
    }
    else {
        res.status(200).json({ message: "Post delet successfully" });
    }
}
else{
    res.status(400).json({massage: "Access Denied"});
}
}


// fetch all post of loggedin user
exports.userPost = async (req, res) => {
    const posts = await Post.find({createdBy: req.user._id});

    res.status(200).json(posts);

}

// fetch all posts of searched user
exports.getUserPost = async (req, res) => {
    const posts = await Post.find({createdBy : req.params.id});

    res.status(200).json(posts);
}

exports.checkOwnPost = async (req, res) => {
    if(req.user._id == req.params.id){
        res.status(200).json("access")
    }
    else{
        res.status(400).json("no-access")
    }
}