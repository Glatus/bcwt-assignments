'use strict';
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const passport = require('./utils/passport');

const app = express();
const port = 3000;

// Log middleware
app.use((req, res, next) => {
    console.log(Date.now() + ': request: ' + req.method + ' ' + req.path);
    next();
});
app.use(session({
    secret: process.env.jWT_KEY,
    resave: false,
    saveUninitialized: false
}));
// Serve example-ui
app.use(express.static('example-ui'));
// Serve uploaded image files
app.use('/uploads', express.static('uploads'));
// Add 'Access-Control-Allow-Origin: *' header to all
// responses using cors middleware
app.use(cors());
// middleware for parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', { session: false }), catRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
