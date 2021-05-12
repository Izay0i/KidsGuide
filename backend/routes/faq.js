const express = require('express');
const router = express.Router();

const faqContoller = require('../controllers/faq-controller');

router.get('/', faqContoller.getFaqs);
router.get('/faq/:id', faqContoller.getFaqByID);
router.get('/faq', faqContoller.getFaqByQuestion);
router.post('/', faqContoller.createFaq);
router.delete('/faq/:id', faqContoller.deleteFaq);

module.exports = router;