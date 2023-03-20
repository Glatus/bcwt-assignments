'use strict';
const express = require('express');
// catRoute
const router = express.Router();
const controller = require('../controllers/catController')
router.get('/', (req, res) => {
  res.send("Test");
});

router.get('/cat', controller.getCatList);
//Tietty kissa
router.get('/cat/:id', controller.getCat);
// POST
router.post('/cat', (req, res) => {
  res.send("With this endpoint you can add cats.")
});

// PUT
router.put('/cat', (req, res) => {
  res.send("With this endpoint you can edit cats.")
});

// DELETE
router.delete('/cat', (req, res) => {
  res.send("With this endpoint you can delete cats.")
});
module.exports = router