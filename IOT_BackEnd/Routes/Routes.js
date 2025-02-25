const express = require('express');
const authMiddleware = require('../MIddleWares/AuthMiddleWare');
const deviceController = require('../Controllers/DeviceController');
const alertController = require('../Controllers/AlertController');
const authController = require('../Controllers/AuthController');
const userController= require('../Controllers/UserController');

const router = express.Router();

router.get('/devices', authMiddleware, deviceController.getDevices);
router.post('/devices', authMiddleware, deviceController.createDevice);
router.put('/device/:id',authMiddleware,deviceController.updateDevice);

router.get('/alerts', authMiddleware, alertController.getAlerts);
router.post('/alerts', authMiddleware, alertController.createAlert);

router.put('user/:id',authMiddleware,userController.updateUser);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify-email',authMiddleware, authController.verifyEmail);
router.post('/request-password-reset', authController.requestPasswordReset);
router.get('/get-rules',authMiddleware,userController.getRules);
router.post('/reset-password', authController.resetPassword);


// router.post('/send-verification-code',authMiddleware, authController.sendVerificationCode);
// router.post('/verify-code',authMiddleware, authMiddleware, authController.verifyCode);




module.exports = router;
