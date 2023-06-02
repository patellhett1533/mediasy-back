const express = require('express');
const { signup, login, verifyUser, resendOtp, forgotPassword, deleteAcc } = require('../controller/auth');
const { requireLogin } = require('../common-middleware/index');
const { validateSignupRequest, isRequestValidated, validateLoginRequest } = require('../validation/auth');
const router = express.Router();

router.post('/signup', validateSignupRequest, isRequestValidated, signup);

router.post('/login', validateLoginRequest, isRequestValidated, login);

router.put('/delete-acc', requireLogin, deleteAcc);

router.post('/verifyOtp', verifyUser);

router.post('/resendOtp', resendOtp);

router.post('/forgot-password', forgotPassword);

module.exports = router;