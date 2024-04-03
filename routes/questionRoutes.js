const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const { authenticateApiKey } = require('../middleware/authMiddleware');

router.get('/isYesNoQuestion', questionController.isYesNoQuestion);
router.get('/getOptionsForQuestion', questionController.getOptionsForQuestion);

module.exports = router; 