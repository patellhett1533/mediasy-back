const express = require('express');
const router = express.Router();
const { requireLogin } = require('../common-middleware/index');
const { postComment, getComment, deleteComment } = require('../controller/comment');

router.post("/comment/:id", requireLogin, postComment);

router.get("/comment/:id", requireLogin, getComment);

router.delete("/comment/:id", requireLogin, deleteComment);

router.get("/self-comment/:id", requireLogin, )

module.exports = router;
