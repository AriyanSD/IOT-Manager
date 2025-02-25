const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const EmailToken = require('../models/EmailToken');
const crypto = require('crypto');
const User = require('../models/User');
const PhoneCode = require('../models/PhoneCode');
const { sendVerificationCode} = require('../config/smsService');
const emailService = require('./MailController');


dotenv.config();

function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.register = async (req, res) => {
    const { username, email, phone_number, password, user_type } = req.body;
    const existingUser = await User.findOne({ where: { phone_number } });
    if (existingUser) {
        return res.status(400).json({ error: "Phone number already exists" });
    }
    if (await User.findOne({ where: { email } })) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ username, email, phone_number, password, user_type });

    const emailToken = crypto.randomBytes(32).toString('hex');
    await EmailToken.create({ email, token: emailToken });

    await emailService.sendVerificationEmail(email, emailToken);

    res.json({ message: 'User registered successfully. Please verify your email.', user });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ message: 'Login successful', token });
};

exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        await emailService.sendResetPasswordEmail(user, token);

        res.json({ message: 'Password reset email sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) return res.status(404).json({ error: 'Invalid token or user not found' });
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(400).json({ error: 'Invalid or expired token' });
    }
};
exports.sendVerificationCode = async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ error: 'Mobile number is required' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    await storePhoneCode(mobile, verificationCode);

    try {
        await sendVerificationCode(mobile, verificationCode);
        res.json({ message: 'Verification code sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send verification code' });
    }
};

exports.verifyEmail = async (req, res) => {
    const { token } = req.query;

    const emailTokenRecord = await EmailToken.findOne({ where: { token } });

    if (!emailTokenRecord) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const currentTime = new Date();
    const tokenTime = new Date(emailTokenRecord.createdAt);
    const expirationTime = 10 * 60 * 1000; 
    if (currentTime - tokenTime > expirationTime) {
        await emailTokenRecord.destroy();
        return res.status(400).json({ error: 'Token has expired' });
    }

    const email = emailTokenRecord.email;

    await User.update({ verifiedEmail: true }, { where: { email } });

    await emailTokenRecord.destroy();

    res.json({ message: 'Email verified successfully' });
};
const storePhoneCode = async (phone_number, code) => {
    await PhoneCode.create({ phone_number, code });
};

exports.verifyPhoneCode = async (req, res) => {
    const { phone_number, code } = req.body;

    if (!phone_number || !code) {
        return res.status(400).json({ error: 'Phone number and code are required' });
    }

    const storedCodeRecord = await PhoneCode.findOne({ where: { phone_number, code } });

    if (!storedCodeRecord) {
        return res.status(400).json({ error: 'Invalid or expired code' });
    }

    const currentTime = new Date();
    const codeTime = new Date(storedCodeRecord.createdAt);
    const expirationTime = 10 * 60 * 1000; 
    if (currentTime - codeTime > expirationTime) {
        return res.status(400).json({ error: 'Code has expired' });
    }

    await User.update({ verifiedNumber: true }, { where: { phone_number } });


    await storedCodeRecord.destroy();

    res.json({ message: 'Phone number verified successfully' });
};


