const express = require('express');
const router = express.Router();

const postController = require('../controllers/post-controller');

router.get('/', postController.getBlogPosts);
router.get('/post/:id', postController.getBlogPostByID);
router.get('/post', postController.getBlogPostByTitle);
router.post('/', postController.createBlogPost);
router.delete('/post/:id', postController.deleteBlogPost);

module.exports = router;