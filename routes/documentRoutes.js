const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

router.get('/documentSummary', documentController.summarize);

module.exports = router;