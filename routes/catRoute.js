'use strict';
const express = require('express');
// catRoute
const router = express.Router();
const controller = require('../controllers/catController')

router.get('/', controller.getCatList);
//Tietty kissa
router.get('/:id', controller.getCat);
// POST
router.post('/', (req, res) => {
  res.send("With this endpoint you can add cats.")
});

// PUT
router.put('/', (req, res) => {
  res.send("With this endpoint you can edit cats.")
});

// DELETE
router.delete('/', (req, res) => {
  res.send("With this endpoint you can delete cats.")
});
module.exports = router