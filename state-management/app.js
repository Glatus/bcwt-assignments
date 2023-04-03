'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//väliaikanen
const localPass = require("./utils/passport.js");
passport.use(localPass.localStrategy);
const app = express();
const port = 3000;

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/form");
  }
};

app.set('views', './views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home");
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.post("/login", passport.authenticate("local", { failureRedirect: "/form" }),
  (req, res) => {

    console.log("success");
    res.redirect("/secret");

  });
app.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
app.get("/secret", loggedIn, (req, res) => {
  res.render("secret");
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