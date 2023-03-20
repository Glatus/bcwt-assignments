'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCatList = (req,res) => {
    res.json(cats);
};
const getCat = (req,res) => {
    res.json(cats.filter(cat => cat.id === req.params.id))
};
module.exports = {
    getCatList,getCat
};