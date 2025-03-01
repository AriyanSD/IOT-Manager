const express = require('express');
const authMiddleware = require('../MIddleWares/AuthMiddleWare');
const deviceController = require('../Controllers/DeviceController');
const alertController = require('../Controllers/AlertController');
const authController = require('../Controllers/AuthController');
const userController= require('../Controllers/UserController');
const roomController = require('../Controllers/RoomController');
const checkDevice = require('../MIddleWares/DeviceCheck');

const router = express.Router();

router.get('/devices', authMiddleware, deviceController.getDevices);
router.post('/devices', authMiddleware, deviceController.createDevice);
router.put('/device/:id',authMiddleware,deviceController.updateDevice);
router.delete('/device/:id',authMiddleware,deviceController.deleteDevice);
router.get('/alerts', authMiddleware, alertController.getAlerts);
router.post('/alerts',checkDevice, alertController.createAlert);

router.put('/user',authMiddleware,userController.updateUser);
router.get('/user',authMiddleware,userController.getUser);
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/request-password-reset', authController.requestPasswordReset);
router.get('/get-rules',userController.getRules);
router.post('/reset-password', authController.resetPassword);

router.get('/:roomId/devices',authMiddleware,deviceController.getDevicesByRoom);

router.get('/user-rooms',authMiddleware,userController.getUserRooms);
router.get("/device/:deviceId/alerts", authMiddleware, alertController.getAlertsByDevice);
// router.post('/send-verification-code',authMiddleware, authController.sendVerificationCode);
// router.post('/verify-code',authMiddleware, authMiddleware, authController.verifyCode);

router.post('/room',authMiddleware,roomController.AddRoom);


module.exports = router;
