const User = require('../model/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "socialmedia";
const bcrypt = require('bcrypt');
const Otp = require('../model/Otp');
const nodemailer = require('nodemailer');

// nodemailer stuff
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "hapatel1533@gmail.com",
        pass: "ivyvkkxildeaoljf"
    }
})

exports.signup = (req, res) => {
    User.findOne({ username: req.body.username })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({ message: error });
            }

            if (user) {
                return res.status(400).json({
                    message: "User Has Already Exists."
                });
            }

            const { firstname, lastname, email, password, username } = req.body;
            const _user = new User({
                firstname,
                lastname,
                email,
                password,
                username
            });

            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json(error);
                }

                if (data) {
                    sendEmail(data, res);
                }
            })

        });
}

exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
        if (user.verified) {
            if (user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id }, JWT_SECRET, {});
                const { _id, firstname, lastname, email, username } = user;

                res.status(200).json({
                    token,
                    user: {
                        _id, firstname, lastname, email, username
                    }
                });
            }
            else {
                return res.status(400).json({
                    message: "Invalid Password"
                });
            }
        }
        else {
            return res.status(400).json({
                message: "Email has not been verified yet. check you inbox"
            });
        }
    }
    else {
        res.status(400).json({ message: "User doesn't exists" });
    }
}

exports.forgotPassword = async (req, res) => {
    const { user, password } = req.body;

    if (user && password) {
        const hash = await bcrypt.hashSync(password, 10);
        const self = await User.findById(user);
        if (self && hash) {
            await User.findByIdAndUpdate(user, {
                hash_password: hash
            })
            res.status(200).json({ message: "Password Change Successfully" });
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    }
    else {
        res.status(400).json({ message: "Empty data not allowed" })
    }
}

const sendEmail = async ({ _id, email }, res) => {
    const otpCode = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
        from: "Tredix<hapatel1533@gmail.com>",
        to: email,
        subject: "Verify your email",
        html: `<p><b><u>${otpCode}</u></b> is your verification code.</p>`
    }

    // hash the otp
    const hashedOtp = await bcrypt.hash(otpCode, 10)
    if (hashedOtp) {
        const newVerification = new Otp({
            userId: _id,
            otp: hashedOtp,
            createdAt: Date.now(),
            expiredAt: Date.now() + 3600000
        });

        await newVerification.save()
        await transporter.sendMail(mailOptions)
            .then(() => {
                res.status(202).json({ message: "verification email sent", id: _id })
            })
            .catch((error) => {
                res.status(400).json({ message: "verification email failed." })
            })
    }
    else {
        res.status(400).json({ message: "couldn't create hash of your otp" })
    }


    // .catch((error) => {
    //     res.status(400).json({ message: "Couldn't save the verification email detail." })
    // })
    // .catch((error) => {
    //     res.status(400).json(error)
    // })
}


exports.verifyUser = async (req, res) => {
    let { user, code } = req.body;

    if (!code || !user) {
        res.status(400).json({ message: "Empty otp is not allowed" })
    }
    else {
        const verifyOtp = await Otp.find({
            userId: user
        });

        if (verifyOtp !== null) {
            if (verifyOtp.expiredAt < Date.now()) {
                await Otp.deleteMany({
                    userId: user
                })
                res.status(400).json({ message: "Otp was expired, please resend the otp" })
            }
            else {

                if (verifyOtp[0].otp) {
                    const hashedCode = await bcrypt.compare(code, verifyOtp[0].otp);

                    if (hashedCode) {
                        await User.findByIdAndUpdate(user, {
                            verified: true
                        });

                        await Otp.deleteMany({
                            userId: user
                        });

                        res.status(200).json({ message: "successfull" })
                    }
                    else {
                        res.status(400).json({ message: "Invalid otp" })
                    }
                }
                else {
                    res.status(400).json({ message: "otp not found" })
                }
            }
        }
        else {
            res.status(400).json({ message: "signup again" })
        }
    }
}

exports.resendOtp = async (req, res) => {
    let { user } = req.body;

    const self = await User.findById(user);

    if (!user) {
        res.status(400).json({ message: "Empty data is not allowed" })
    }
    else {
        if (self) {
            await Otp.deleteMany({ userId: user });
            sendEmail({ _id: user, email: self.email }, res);
            res.status(200).json({ message: "Otp send successfully" })
        }
        else {
            res.status(400).json({ message: "User not found" })
        }
    }
}

exports.deleteAcc = async (req, res) => {
    const user = req.user._id;

    const accDelete = await User.findByIdAndRemove(user);

    if (accDelete) {
        res.status(200).json({ message: "success" });
    }
    else {
        res.status(400).json({ message: "Try Later, Something went wrong" });
    }
}