const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const multerUploadMiddleware = require('../middleware/multer-upload-middleware');
const postController = require('../controllers/post-controller');

router.get('/', postController.getPosts);
router.get('/user/:id', postController.getPostsByUserID);
router.get('/post/:id', postController.getPostByID);
router.get('/post', postController.getPostByTitle);
router.post(
	'/', 
	[authMiddleware.verifyToken, multerUploadMiddleware.single('thumbnail')], 
	postController.createPost
);
router.put(
	'/', 
	[authMiddleware.verifyToken, multerUploadMiddleware.single('thumbnail')], 
	postController.updatePost
);
router.delete('/post/:id', authMiddleware.verifyToken, postController.deletePost);

module.exports = router;