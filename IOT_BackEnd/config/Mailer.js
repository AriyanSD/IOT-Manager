const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.DEFAULT_EMAIL, 
        pass: process.env.EMAIL_PASSWORD    
    }
});


transporter.verify((error, success) => {
    if (error) {
        console.log('Error connecting to mail server:', error);
    } else {
        console.log('Mail server is ready to send emails.');
    }
});

module.exports = transporter;
