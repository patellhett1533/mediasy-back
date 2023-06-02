const express = require('express');
const router = express.Router();
const Notify = require('./../model/Notify');
const { requireLogin } = require('../common-middleware/index');

router.get("/notify", requireLogin, async(req, res) => {
    const user = req.user._id;
    const notifications = await Notify.find({receipent : user});

    if(notifications){
        res.status(200).json(notifications);
    }
});

module.exports = router;