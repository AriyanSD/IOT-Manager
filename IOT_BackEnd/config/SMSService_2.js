const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.SMS_API_KEY;
const BASE_URL = `https://api.kavenegar.com/v1/${API_KEY}/sms/send.json`;
const SENDER_NUMBER = '2000660110'; // Replace with your sender number

/**
 * Sends an SMS notification using Kavenegar
 * @param {string} mobile - The recipient's phone number
 * @param {string} message - The message content
 */
const sendSMS = async (mobile, message) => {
    try {
        const params = new URLSearchParams({
            receptor: mobile,
            message: message,
            sender: SENDER_NUMBER
        });

        const response = await axios.post(`https://api.kavenegar.com/v1/${API_KEY}/sms/send.json`, params.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return response.data;
    } catch (error) {
        console.error('SMS Sending Error:', error.response?.data || error.message);
        throw error;
    }
};



const TEMPLATE_NAME = 'YourTemplateName'; 

/**
 * Sends a verification code via Kavenegar Verify Lookup API
 * @param {string} mobile - The recipient's phone number
 * @param {string} code - The verification code to send
 * @param {string} type - Message type ('sms' or 'call'), default is 'sms'
 * @returns {Promise<Object>}
 */
const sendVerificationCode = async (mobile, code, type = 'sms') => {
    try {
        const params = new URLSearchParams({
            receptor: mobile,
            token: code,
            template: TEMPLATE_NAME,
            type, 
        });

        const response = await axios.post(`https://api.kavenegar.com/v1/${API_KEY}/verify/lookup.json`, params.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        return response.data;
    } catch (error) {
        console.error('SMS Verification Error:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = { sendVerificationCode,sendSMS };
