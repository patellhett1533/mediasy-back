const express = require('express');
const { requireLogin } = require('../common-middleware');
const { editProfile, getProfile, getUserProfile, getUserId } = require('../controller/profile');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const router = express.Router();

// upload prifle picture to folder using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'userImg'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

  const upload = multer({storage});

router.put('/editProfile', requireLogin, upload.single('profilePic') , editProfile);

router.get('/profile', requireLogin, getProfile);

router.get('/profile/:id', requireLogin, getUserProfile);

router.get('/userId/:uname', getUserId);



module.exports = router;