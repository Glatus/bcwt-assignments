'use strict';
const express = require('express');
// userRoute
const router = express.Router();
const controller = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

router.get('/', controller.getUserList);
//Tietty käyttäjä
router.get('/:id', controller.getUser);
// POST
router.post('/', body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
  body("passwd").isLength({ min: 8 }).withMessage('Name must be at least 8 characters'),
  body("email").isEmail().withMessage('Email must be valid'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    controller.user_create_post(req,res);
    controller.postUser(req,res);    
  });
// PUT
router.put('/', (req, res) => {
  res.send("With this endpoint you can edit users.");
});

// DELETE
router.delete('/', (req, res) => {
  res.send("With this endpoint you can delete users.");
});
module.exports = router;