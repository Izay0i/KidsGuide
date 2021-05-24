const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const postController = require('../controllers/post-controller');

router.get('/', postController.getBlogPosts);
router.get('/post/:id', postController.getBlogPostByID);
router.get('/post', postController.getBlogPostByTitle);
router.post('/', authMiddleware.verifyToken, postController.createBlogPost);
router.delete('/post/:id', authMiddleware.verifyToken, postController.deleteBlogPost);

module.exports = router;