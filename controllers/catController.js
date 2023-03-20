'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCatList = (req,res) => {
    res.json(cats)
};

module.exports = {
    getCatList
};