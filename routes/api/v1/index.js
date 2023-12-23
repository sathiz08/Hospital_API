const express = require('express');
const router = express.Router();

//doctors route
router.use('/doctors', require('./doctors'));

//patients route
router.use('/patients', require('./patients'));

//report route
router.use('/reports', require('./reports'));

module.exports = router;