const express = require('express');
const userRouter = require('./routes/user/userRouter');
const channelRouter = require("./routes/channel/channelRouter");
const messageRouter = require("./routes/message/messageRouter");
const session = require('express-session');

const app = express();
app.use(session({secret: 'Zq4t7w!z%C*F-JaNdRgUkXn2r5u8x/A?',saveUninitialized: true,resave: true, name: 'messagingAppSessionId'}));
app.use(express.json());
app.use("/users", userRouter);
app.use("/channels", channelRouter);
app.use("/messages", messageRouter);

app.listen(8080, ()=> console.log('server listening on port 8080'))