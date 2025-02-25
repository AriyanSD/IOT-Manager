
const dotenv = require('dotenv');
const {Smsir}=require('smsir-js');
dotenv.config();

const API_KEY = process.env.SMS_API_KEY; 
const LINE_NUMBER = process.env.SMS_LINE_NUMBER;
const TEMPLATE_ID = 123456;

const smsir = new Smsir(API_KEY, LINE_NUMBER);

/**
 * Sends a verification code via SMS
 * @param {string} mobile - The recipient's phone number
 * @param {string} code - The verification code to send
 * @returns {Promise<Object>}
 */
// Sending verification code via SMS
const sendVerificationCode = async (mobile, code) => {
    try {
        const parameters = [{ name: 'Code', value: code }];
        const response = await smsir.SendVerifyCode(mobile, TEMPLATE_ID, parameters);
        return response;
    } catch (error) {
        console.error('SMS Sending Error:', error);
        throw error;
    }
};


/**
 * Sends bulk SMS alerts
 * @param {string} message - The alert message to send
 * @param {array<string>} mobiles - List of recipient phone numbers
 * @param {number|null} sendDateTime - Scheduled time for sending (optional)
 * @returns {Promise<Object>}
 */
const sendBulkAlerts = async (message, mobiles, sendDateTime = null) => {
    try {
        const response = await smsir.SendBulk(message, mobiles, sendDateTime, LINE_NUMBER);
        return response;
    } catch (error) {
        console.error('Bulk SMS Sending Error:', error);
        throw error;
    }
};

/**
 * Saves verification code to Redis for a limited time
 * @param {string} mobile - The phone number
 * @param {string} code - The generated code
 */
const storeVerificationCode = async (mobile, code) => {
    await redis.set(`verify:${mobile}`, code, 'EX', 300); // Expires in 5 minutes
};

/**
 * Retrieves the stored verification code
 * @param {string} mobile - The phone number
 * @returns {Promise<string|null>}
 */
const getStoredVerificationCode = async (mobile) => {
    return await redis.get(`verify:${mobile}`);
};

module.exports = { sendBulkAlerts, sendVerificationCode, storeVerificationCode, getStoredVerificationCode };
