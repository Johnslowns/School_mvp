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



// --- SUBJECT ROUTES ---
router.get('/subjects', schoolSetupController.getAllSubjects);
router.post('/subjects', schoolSetupController.createSubject);
router.delete('/subjects/:id', schoolSetupController.deleteSubject);
router.put('/subjects/:id', schoolSetupController.updateSubjectDepartment);

// --- DEPARTMENT ROUTES ---
router.get('/departments', schoolSetupController.getAllDepartments);
router.post('/departments', schoolSetupController.createDepartment);
router.post('/departments', controller.createDepartment);
router.get('/departments', controller.getDepartmentsWithSubjects);
router.post('/departments/assign', controller.assignSubjectsToDepartment);


// --- DORMITORY ROUTES ---
router.get('/dormitories', schoolSetupController.getAllDormitories);
router.post('/dormitories', schoolSetupController.createDormitory);
router.delete('/dormitories/:id', schoolSetupController.deleteDormitory);

module.exports = router;

