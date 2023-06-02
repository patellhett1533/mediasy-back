const User = require('../model/User');

exports.searchUser = async (req, res) => {
    const key = req.params.key;

    const user = await User.find({
        "$or" : [
            {firstname: {$regex: key, $options: "$i"}},
            {lastname: {$regex: key, $options: "$i"}},
            {username: {$regex: key, $options: "$i"}}
        ]
    });

    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(400).json({message: "Try again later"});
    }
}