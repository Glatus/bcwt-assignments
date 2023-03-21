'use strict';
const express = require('express');
// catRoute
const router = express.Router();
const multer  = require('multer')

// piettää kuvalle vanhan nimen
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './uploads');
  },
  filename: function (req, file, callback) {
      const filename = file.originalname || new Date().toISOString();
      callback(null, filename);
  }
});

const upload = multer({ storage })
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