'use strict';
require('dotenv').config()
const express = require('express');
var cors = require('cors')
const { cats } = require('./models/catModel');
const catRouter = require('./routes/catRoute.js')
const userRouter = require('./routes/userRoute.js');
const passport = require('./utils/passport.js');
const authRoute = require('./routes/authRoute');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(passport.initialize());
app.use('/auth', authRoute);
app.use("/cat", passport.authenticate('jwt', {session: false}), catRouter);
app.use("/user",  passport.authenticate('jwt', {session: false}),userRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
