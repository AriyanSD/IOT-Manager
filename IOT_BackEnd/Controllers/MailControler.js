const transporter = require('../config/Mailer');
const dotenv = require('dotenv');
dotenv.config();

exports.sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const mailOptions = {
            from: 'your-email@gmail.com',
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

exports.sendAlert = async (user , device) => {
        subject= `Alert from ${device}`;
        text = `Dear ${user},\n\nThis is to inform you that there is an alert from ${device.device_name}. Please check the device and take necessary action.\n\nRegards,\nIoT Team`;
        to = user.email;
    try {
        const mailOptions = {
            from: process.env.DEFAULT_EMAIL ,
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

exports.sendResetPasswordEmail = async (user, token) => {
    const resetUrl = `http://yourfrontend.com/reset-password?token=${token}`;
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
    });

    await transporter.sendMail({
        to: user.email,
        subject: 'Password Reset',
        text: `Click the link to reset your password: ${resetUrl}`
    });
};
