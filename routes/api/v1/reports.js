const express =  require('express');
const router = express.Router();
const passport = require('passport');

//importing report controller
const reportController = require('../../../controllers/reports_controller');
// const reportController = require('../../../controllers/report_controller');

//fetching all the reports
router.get('/:status', reportController.status);

module.exports = router;