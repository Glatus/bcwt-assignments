'use strict';
const express = require('express');
// catRoute
const router = express.Router();
router.get('/', (req, res) => {
  res.send("Test");
});

router.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});
//Tietty kissa
router.get('/cat/:id', (req,res) => {
  res.send(`You reqested a cat whose id is ${req.params.id}`);
});
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