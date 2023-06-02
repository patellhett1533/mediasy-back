const express = require('express');
const { requireLogin } = require('../common-middleware');
const router = express.Router();
const {searchUser} = require('../controller/search');

router.get("/explore/:key", requireLogin, searchUser);

module.exports = router;