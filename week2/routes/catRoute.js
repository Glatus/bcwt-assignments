'use strict';
const express = require('express');
// catRoute
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './uploads/' })
const controller = require('../controllers/catController')

router.get('/', controller.getCatList);
//Tietty kissa
router.get('/:id', controller.getCat);
// POST

router.post('/', upload.single('cat'), controller.postCat);

// PUT
router.put('/', (req, res) => {
  res.send("With this endpoint you can edit cats.")
});

// DELETE
router.delete('/', (req, res) => {
  res.send("With this endpoint you can delete cats.")
});
module.exports = router