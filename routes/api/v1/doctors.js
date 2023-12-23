const express =  require('express');
const router = express.Router();

//importing doctors controller
const doctorController = require('../../../controllers/doctors_controller');

//register a doctors
router.post('/register', doctorController.createDoctor);

//login a doctors
router.post('/login', doctorController.createSession);

module.exports = router;