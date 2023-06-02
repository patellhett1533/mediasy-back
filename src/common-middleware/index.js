const jwt = require('jsonwebtoken');
const JWT_SECRET = "socialmedia";

exports.requireLogin = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization;
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
    }
    else{
        res.status(400).json({message: "Authorization is required"})
    }
    
    next();
};
