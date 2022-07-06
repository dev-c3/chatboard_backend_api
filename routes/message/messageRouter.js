const express = require('express');
const { sendMessage } = require('./messageController');
const errorHandler = require('../errorHandler')
const router = express.Router();
//req.body must contain a channelId, and message attribute.
router.post("/", sendMessage);
router.all("/", errorHandler)
module.exports = router;