const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth-middleware');
const reportController = require('../controllers/report-controller');

router.use(authMiddleware.verifyToken);

router.get('/', reportController.getReports);
router.post('/', reportController.createReport);

module.exports = router;