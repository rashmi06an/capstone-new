const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { getIncomeAnalytics } = require('../controllers/analyticsController');

router.get('/income', authenticateToken, getIncomeAnalytics);

module.exports = router;

