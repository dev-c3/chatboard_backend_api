const express = require('express');
const { createChannel, getChannelMessages } = require('./channelController');
const errorHandler = require('../errorHandler')
const router = express.Router();
//req.body needs to contain a channelName attribute and the usersession must contain a logged in user.
router.post("/", createChannel);
//channelId is a needed parameter in the request body.
router.get("/", getChannelMessages);
router.all("/", errorHandler);
module.exports = router;