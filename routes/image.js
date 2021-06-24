const express = require('express');
const router = express.Router();

const imageController = require('../controllers/image-controller');
const authMiddleware = require('../middleware/auth-middleware');
const multerUploadMiddleware = require('../middleware/multer-upload-middleware');

router.get('/', imageController.getImages);
router.get('/image/:id', imageController.getImageByID);
router.post(
	'/', 
	[authMiddleware.verifyToken, multerUploadMiddleware.single('avatar')], 
	imageController.insertImage
);
router.put(
	'/', 
	[authMiddleware.verifyToken, multerUploadMiddleware.single('avatar')], 
	imageController.updateImage
);

module.exports = router;