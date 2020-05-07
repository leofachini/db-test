const express = require('express');
const cors = require('cors');
const router = express.Router();
const LoggerController = require('./logger.controller');


router.post('/log', LoggerController.processLogFile);

module.exports = router;
