const transporter = require('../config/Mailer'); // import the transporter
const dotenv = require('dotenv');
dotenv.config();

exports.sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const mailOptions = {
            from: process.env.DEFAULT_EMAIL,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully', info });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.sendAlert = async (user, device) => {
    const subject = `Alert from ${device.device_name}`;
    const text = `Dear ${user.username},\n\nThis is to inform you that there is an alert from ${device.device_name}. Please check the device and take necessary action.\n\nRegards,\nIoT Team`;
    const to = user.email;

    try {
        const mailOptions = {
            from: process.env.DEFAULT_EMAIL,
            to,
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${user.email} for alert from ${device.device_name}`);
    } catch (error) {
        console.error('Error sending alert email:', error.message);
    }
};

exports.sendResetPasswordEmail = async (user, token) => {
    const resetUrl = `${process.env.FRONTEND_URL}/?reset-password?token=${token}`;
    
    try {
        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: ${resetUrl}`
        });
        console.log('Password reset email sent to:', user.email);
    } catch (error) {
        console.error('Error sending reset password email:', error.message);
    }
};

exports.sendVerificationEmail = async (email, token) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    try {
        await transporter.sendMail({
            to: email,
            subject: 'Email Verification',
            text: `Click the link to verify your email: ${verificationUrl}`
        });
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error.message);
    }
};
