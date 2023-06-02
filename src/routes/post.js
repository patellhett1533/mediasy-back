const express = require('express');
const { requireLogin } = require('../common-middleware');
const { post, allPost, editPost, getPost, deletPost, userPost, getUserPost, checkOwnPost } = require('../controller/post');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const { validatePost, isPostValidated } = require('../validation/post');
const router = express.Router();

// upload post image to folder using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

  const upload = multer({storage});


router.post('/addPost', requireLogin ,validatePost, isPostValidated ,upload.array('postPicture') ,post);

router.get('/feed', requireLogin, allPost);

router.get('/userPost', requireLogin, userPost);

router.put('/editPost/:id', requireLogin, editPost);

router.get('/feed/:id', requireLogin, getPost);

router.delete("/deletePost/:id", requireLogin, deletPost);

router.get("/userPost/:id", requireLogin, getUserPost);

router.get('/ownPost/:id', requireLogin, checkOwnPost);

module.exports = router;