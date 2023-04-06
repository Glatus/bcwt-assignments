'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const username = "foo";
const password = "bar";
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: false
}));
app.get("/", (req, res) => {
  res.render("home");
});
app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/login', (req, res) => {
  if (req.body.username === username && req.body.password === password) {
    req.session.logged = true;
    res.redirect('/secret');
  } else {
    req.session.logged = false;
    res.redirect('/form');
  }
});

app.get('/secret', (req, res) => {
  if (req.session.logged) {
    res.render('secret');
  } else {
    res.redirect('/form');
  }
});

app.get('/setCookie/:clr', (req, res) => {
  const clr = req.params.clr;
  res.cookie('color', clr);
  res.send(`Color cookie set to ${clr}`);
});

app.get('/getCookie', (req, res) => {
  const clr = req.cookies.color;
  if (clr) {
    res.send(`The color is ${clr}`);
  } else {
    res.send('No color available');
  }
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('Color cookie deleted');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));