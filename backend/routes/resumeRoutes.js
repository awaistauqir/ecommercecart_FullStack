const express = require('express'),
	{
		getResumeByUsername,
		addResume,
		addPersonalDetails,
		addProject,
		addWork,
		updateWork,
		addEducation,
		addInterest,
		addContact,
		deleteInterest,
		deleteProject,
		updateProject,
		deleteEducation,
		deleteWork,
		updateEducation,
	} = require('../controller/resumeController');
const router = express.Router();
router.get('/getResume/:username', getResumeByUsername);
router.post('/addResume', addResume);
router.post('/addPersonalDetails', addPersonalDetails);
router.post('/addProject', addProject);
router.post('/deleteProject', deleteProject);
router.post('/updateProject', updateProject);
router.post('/addWork', addWork);
router.post('/deleteWork', deleteWork);
router.post('/updateWork', updateWork);
router.post('/addEducation', addEducation);
router.post('/deleteEducation', deleteEducation);
router.post('/updateEducation', updateEducation);
router.post('/addInterest', addInterest);
router.post('/deleteInterest', deleteInterest);
router.post('/addContact', addContact);
module.exports = router;
