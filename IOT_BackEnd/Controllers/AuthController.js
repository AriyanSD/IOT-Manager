const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const { sendVerificationCode } = require('./smsService');
const { storeVerificationCode, getStoredVerificationCode } = require('./smsService');

dotenv.config();

function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.register = async (req, res) => {
    const { username, email, phone_number, password, user_type } = req.body;

    if (await User.findOne({ where: { email } })) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ username, email, phone_number, password, user_type });
    res.json({ message: 'User registered successfully', user });
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
    await storeVerificationCode(mobile, verificationCode);

    try {
        await sendVerificationCode(mobile, verificationCode);
        res.json({ message: 'Verification code sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send verification code' });
    }
};
exports.verifyCode = async (req, res) => {
    const { mobile, code } = req.body;

    if (!mobile || !code) {
        return res.status(400).json({ error: 'Mobile and verification code are required' });
    }

    const storedCode = await getStoredVerificationCode(mobile);

    if (!storedCode) {
        return res.status(400).json({ error: 'Verification code expired or not found' });
    }

    if (storedCode !== code) {
        return res.status(400).json({ error: 'Invalid verification code' });
    }

    res.json({ message: 'Phone number verified successfully' });
}

