'use strict';
const express = require('express');
// userRoute
const router = express.Router();
const controller = require('../controllers/userController')

router.get('/', controller.getUserList);
//Tietty käyttäjä
router.get('/:id', controller.getUser);
// POST
router.post('/', (req, res) => {
  res.send("With this endpoint you can add users.")
});

// PUT
router.put('/', (req, res) => {
  res.send("With this endpoint you can edit users.")
});

// DELETE
router.delete('/', (req, res) => {
  res.send("With this endpoint you can delete users.")
});
module.exports = router