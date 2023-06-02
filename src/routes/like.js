const express = require('express');
const { requireLogin } = require('../common-middleware/index');
const { likePost, isLike } = require('../controller/like');

const router = express.Router();

router.put('/like/:id', requireLogin ,likePost);

router.get('/isLike/:id', requireLogin, isLike);

module.exports = router;