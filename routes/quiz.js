const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const quizController = require('../controllers/quiz-controller');

router.get('/', quizController.getQuizzes);
router.get('/quiz/:id', quizController.getQuizByID);
router.get('/post/:id', quizController.getQuizByPostID);
router.post('/', authMiddleware.verifyToken, quizController.addQuiz);
router.put('/', authMiddleware.verifyToken, quizController.updateQuiz);
router.delete('/post/:id', authMiddleware.verifyToken, quizController.deleteQuiz);

module.exports = router;