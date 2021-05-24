const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const faqContoller = require('../controllers/faq-controller');

router.get('/', faqContoller.getFaqs);
router.get('/faq/:id', faqContoller.getFaqByID);
router.get('/faq', faqContoller.getFaqByQuestion);
router.post('/', authMiddleware.verifyToken, faqContoller.createFaq);
router.delete('/faq/:id', authMiddleware.verifyToken, faqContoller.deleteFaq);

module.exports = router;