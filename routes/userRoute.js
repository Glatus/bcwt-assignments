'use strict';
const express = require('express');
// userRoute
const router = express.Router();
const controller = require('../controllers/userController')
router.get('/', (req, res) => {
  res.send("Test");
});

router.get('/user', controller.getUserList);
//Tietty käyttäjä
router.get('/user/:id', controller.getUser);
// POST
router.post('/user', (req, res) => {
  res.send("With this endpoint you can add users.")
});

// PUT
router.put('/user', (req, res) => {
  res.send("With this endpoint you can edit users.")
});

// DELETE
router.delete('/user', (req, res) => {
  res.send("With this endpoint you can delete users.")
});
module.exports = router