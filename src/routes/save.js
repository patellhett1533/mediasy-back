const express = require('express');
const { requireLogin } = require('../common-middleware/index');
const { savePost, checkSaved, getSavePost } = require('../controller/save');

const router = express.Router();

router.put('/save/:id',requireLogin, savePost);

router.get('/checkSave/:id', requireLogin, checkSaved);

router.get('/get-save', requireLogin, getSavePost);

module.exports = router;