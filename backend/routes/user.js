const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const userController = require('../controllers/user-controller');

router.use(authMiddleware.verifyToken);

router.get('/', userController.getUsers);
router.get('/user/:id', userController.getUserByID);
router.get('/user', userController.getUserByName);
router.put('/user/email', authMiddleware.veritfyEmail, userController.updateUserEmail);
router.put('/user/password', userController.updateUserPassword);
router.put('/user/details', userController.updateUserDetails);
router.put('/user/info', userController.updateUserInfo);

module.exports = router;