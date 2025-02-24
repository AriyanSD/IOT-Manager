const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const deviceController = require('./controllers/DeviceController');
const alertController = require('./controllers/AlertController');
const authController = require('./controllers/AuthController');

const router = express.Router();

router.get('/devices', authMiddleware, deviceController.getDevices);
router.post('/devices', authMiddleware, deviceController.createDevice);


router.get('/alerts', authMiddleware, alertController.getAlerts);
router.post('/alerts', authMiddleware, alertController.createAlert);

router.post('/login', authController.login);
router.post('/register', authController.register);

router.post('/request-password-reset', authController.requestPasswordReset);

router.post('/reset-password', authController.resetPassword);


module.exports = router;
