'use strict';
const express = require('express');
var cors = require('cors')
const { cats } = require('./models/catModel');
const catRouter = require('./routes/catRoute.js')
const userRouter = require('./routes/userRoute.js');
const app = express();
const port = 3000;

// Log middleware
app.use((req, res, next) => {
    console.log(Date.now() + ': request: ' + req.method + ' ' + req.path);
    next();
});
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
app.use("/", express.static("example-ui"))
app.use("/uploads/", express.static("uploads"))
app.use(cors())
app.use("/cat", catRouter);
app.use("/user", userRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
