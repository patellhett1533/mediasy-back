const Notify = require('../model/Notify');
const User = require('../model/User');

exports.followUser = async (req, res) => {
    if (req.user._id !== req.params.id) {
        const user = await User.findById(req.params.id);
        const selfUser = await User.findById(req.user._id);

        if (!user.follower.includes(req.user._id)) {
            await user.updateOne({ $push: { follower: req.user._id } });
            await selfUser.updateOne({ $push: { following: req.params.id } });

            const text = " started following you.";
            const img = selfUser.profilePic;

            const notify = new Notify({
                self: selfUser,
                receipent: user,
                text,
                img,
                role: "Userimages"
            });

            await notify.save((err, data) => {
                if(err){
                    res.status(400).json(err);
                }
            })

            res.status(200).json('followed')


        }
        else {
            await user.updateOne({ $pull: { follower: req.user._id } });
            await selfUser.updateOne({ $pull: { following: req.params.id } });

            res.status(200).json('unfollowed')
        }
    }
    else {
        res.status(400).json({ message: "you can't follow yourself" })
    }

}

exports.checkFollow = async (req, res) => {
    if (req.user._id !== req.params.id) {
        const user = await User.findById(req.params.id);

        if (!user.follower.includes(req.user._id)) {
            res.status(200).json('follow')
        }
        else {
            res.status(200).json('followed')
        }
    }
    else {
        res.status(400).json({ message: "you can't follow yourself" })
    }
}