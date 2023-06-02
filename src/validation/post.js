const { body, validationResult } = require('express-validator');

exports.validatePost = [
    body('postPicture', 'Image is required for post').notEmpty()
];

exports.isPostValidated = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.array().length < 0){
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}