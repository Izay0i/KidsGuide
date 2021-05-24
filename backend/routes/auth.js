const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/signup', authMiddleware.veritfyEmail, authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;