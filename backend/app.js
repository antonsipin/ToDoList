require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override')
const sessionFileStore = require('session-file-store')
const indexRouter = require('./src/routes/index');
const taskRouter = require('./src/routes/task');
const usersRouter = require('./src/routes/users');
const session = require('express-session')
const app = express();
const hbs = require('hbs')
const mongoose = require("mongoose");
const dbConnect = require('./src/config/dbConnect')
const userMiddle = require('./src/middleware/user')
const accountRouter = require('./src/routes/account')
const fs = require('fs')
const PORT = process.env.PORT || 3100
const cors = require('cors');

dbConnect()
app.set('session cookie name', 'sid')
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src', 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'src', 'partials'))
hbs.registerHelper('htmlTemplate', (name) => {
  const template = fs.readFileSync(`./src/views/${name}.hbs`, 'utf8')
  return template;
})

app.use(cors())
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const FileStore = sessionFileStore(session)
app.use(session({
  name: app.get('session cookie name'),
  secret: process.env.SESSION_SECRET,
  store: new FileStore({
    secret: process.env.SESSION_SECRET,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24
  },
}))

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(userMiddle.userName)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account', userMiddle.isAuth, accountRouter)
app.use('/task', taskRouter);


app.use(function (req, res, next) {
  res.render('404')
});

app.listen(PORT, () => {
  console.log('Server has been started on port: ', PORT)
})

module.exports = app;
