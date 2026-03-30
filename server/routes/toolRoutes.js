const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/usage', authMiddleware, toolController.saveUsage);
router.get('/history', authMiddleware, toolController.getHistory);

module.exports = router;
