const express = require('express');
const router = express.Router();
const { requireLogin } = require('../common-middleware/index');
const { sendChat, fetchChat, deleteChat } = require('../controller/chat');

router.post('/chat/:id', requireLogin, sendChat);

router.get('/chat/:id', requireLogin, fetchChat);

router.delete('/chat/:id', requireLogin, deleteChat);

module.exports = router