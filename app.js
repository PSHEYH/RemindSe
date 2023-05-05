const express = require("express");
const morgan = require('morgan');
const taskRouter = require('./routes/taskRoute');
const usersRouter = require('./routes/usersRoute');
const categoryRouter = require('./routes/categoryRoute');
var path = require('path');
var fs = require('fs');
const errorHandler = require("./handlers/errorHandler");

const app = express();

app.use(express.json({ limit: '20kb' }));

app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/category', categoryRouter);

var accessLogStream = fs.createWriteStream(path.join(__dirname + "/logs", 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

app.use(errorHandler);
module.exports = app;