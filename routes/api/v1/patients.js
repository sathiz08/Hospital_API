const express = require('express');
const router = express.Router();
const passport = require('passport');
const Patient = require('../../../models/patients');

//importing patient controller
const patientController = require('../../../controllers/patients_controller');

// show all the patients route
router.get("/", async (req, res) => {
  const patient = await Patient.find({});
  return res.send(patient);
});

//registering a patient
router.post('/register', patientController.register);

//create patient report
router.post('/:id/create_report', patientController.createReport);

//get all reports of a particular patient
router.get('/:id/all_reports', patientController.allReports);

module.exports = router;