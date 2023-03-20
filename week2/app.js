'use strict';
const express = require('express');
const { cats } = require('../models/catModel');
const catRouter = require('../routes/catRoute.js')
const userRouter = require('../routes/userRoute.js');
const app = express();
const port = 3000;
app.use("/cat", catRouter);
app.use("/user", userRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
