'use strict';
const express = require('express');
const passport = require('passport')
// userRoute
const router = express.Router();
const controller = require('../controllers/userController')
router.get('/', controller.getUserList);
//Tietty käyttäjä
router.get('/:id',passport.authenticate('jwt', {session: false}), controller.getUser);
router.get("/token",controller.checkToken)
// POST
router.post('/', controller.user_create_post, controller.postUser);

// PUT
router.put('/', (req, res) => {
  res.send("With this endpoint you can edit users.")
});

// DELETE
router.delete('/', (req, res) => {
  res.send("With this endpoint you can delete users.")
});
module.exports = router