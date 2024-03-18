const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get('/isYesNoQuestion', questionController.isYesNoQuestion);
router.get('/getOptionsForQuestion', questionController.getOptionsForQuestion);

module.exports = router; 