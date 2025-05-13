// routes/schoolSetupRoutes.js

const express = require('express');
const router = express.Router();
const schoolSetupController = require('../controllers/schoolSetupController');

// 1. Fetch all class levels
router.get('/class-levels', schoolSetupController.getAllClassLevels);

// 2. Fetch streams for a specific class level
router.get('/class-levels/:id/streams', schoolSetupController.getStreamsForClassLevel);

// 3. Create a new class level with streams
router.post('/class-levels', schoolSetupController.createClassLevelWithStreams);

// 4. Update an existing class level and its streams
router.put('/class-levels/:id', schoolSetupController.updateClassLevelWithStreams);

// 5. Delete a class level
router.delete('/class-levels/:id', schoolSetupController.deleteClassLevel);

module.exports = router;

