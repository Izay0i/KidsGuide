const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const postController = require('../controllers/post-controller');

router.get('/', postController.getPosts);
router.get('/user/:id', postController.getPostsByUserID);
router.get('/post/:id', postController.getPostByID);
router.get('/post', postController.getPostByTitle);
router.post('/', authMiddleware.verifyToken, postController.createPost);
router.put('/', authMiddleware.verifyToken, postController.updatePost);
router.delete('/post/:id', authMiddleware.verifyToken, postController.deletePost);

module.exports = router;