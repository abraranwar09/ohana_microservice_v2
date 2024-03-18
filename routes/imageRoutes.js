const express = require('express');
const router = express.Router();
const cleanupInstructionsController = require('../controllers/cleanupInstructionsController');
const dataFromImageController = require('../controllers/dataFromImageController');
const formDataController = require('../controllers/formDataController');
const ingredientsController = require('../controllers/ingredientsController');

router.get('/cleanupInstructions', cleanupInstructionsController.getCleanupInstructions);
router.get('/getDataFromImage', dataFromImageController.getDataFromImage);
router.get('/getFormData', formDataController.getFormData);
router.get('/getIngredientsFromImage', ingredientsController.getIngredientsFromImage);


module.exports = router;