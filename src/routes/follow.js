const express = require('express');
const {requireLogin} = require('../common-middleware/index');
const { followUser, checkFollow } = require('../controller/follow');
const router = express.Router();

router.put('/follow/:id', requireLogin , followUser);

router.get('/checkFollow/:id', requireLogin, checkFollow);

module.exports = router;