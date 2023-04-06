'use strict';
const catModel = require('../models/catModel');
const { validationResult } = require('express-validator');

const getCatList = async (req, res) => {
    try {
        const ownerId = req.user.id;
        let cats = await catModel.getAllCatsByOwnerId(ownerId);
        // convert ISO date to date only
        // should this be done on the front-end side??
        cats = cats.map((cat) => {
            cat.birthdate = cat.birthdate.toISOString().split('T')[0];
            return cat;
        });
        res.json(cats);
    } catch (error) {
        res.status(500).json({ error: 500, message: error.message });
    }
};

const getCat = async (req, res) => {
    //console.log(req.params);
    // convert id value to number
    const catId = Number(req.params.id);
    // check if number is not an integer
    if (!Number.isInteger(catId)) {
        res.status(400).json({ error: 500, message: 'invalid id' });
        return;
    }
    // TODO: wrap to try-catch
    const [cat] = await catModel.getCatById(catId);
    // console.log('getCat', cat);
    if (cat) {
        res.json(cat);
    } else {
        // send response 404 if id not found in array
        // res.sendStatus(404);
        res.status(404).json({ message: 'Cat not found.' });
    }
};

const postCat = async (req, res) => {
    // console.log('posting a cat', req.body, req.file);
    if (!req.file) {
        res.status(400).json({
            status: 400,
            message: 'Invalid or missing image file'
        });
        return;
    }
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        res.status(400).json({
            status: 400,
            errors: validationErrors.array(),
            message: 'Invalid post data'
        });
        return;
    }
    const newCat = req.body;
    newCat.filename = req.file.filename;
    // TODO: use req.user to add correct owner id
    try {
        const result = await catModel.insertCat(newCat);
        res.status(201).json({ message: 'new cat added!' });
    } catch (error) {
        res.status(500).json({ error: 500, message: error.message });
    }
};

const cat_update_put = async (req, res) => {
    const { id } = req.params.owner;
    const { name, weight, birthdate } = req.body;
    const owner = req.user.id; // assuming the user id is stored in req.user.id

    try {
        let result;
        if (req.user.role == 0) {
            result = await catModel.updateCatAdmin({ id, name, weight, birthdate });
        } else {
            result = await catModel.updateCat({ id, name, weight, owner, birthdate });
        }

        if (result.affectedRows > 0) {
            res.status(200).send(`Cat with id ${id} updated successfully`);
        } else {
            res.status(404).send(`Cat with id ${id} not found`);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Error updating cat");
    }
};

const cat_delete = async (req, res) => {
    const { id } = req.params.owner;

    try {
        let result;
        if (req.user.isAdmin) {
            result = await catModel.deleteCatAdmin(id);
        } else {
            result = await catModel.deleteCat(id, req.user.id);
        }

        if (result.affectedRows > 0) {
            res.status(200).send(`Cat with id ${id} deleted successfully`);
        } else {
            res.status(404).send(`Cat with id ${id} not found`);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Error deleting cat");
    }
};

const cat_create_post = async (req, res) => {
    try {
        catModel.addCat(req);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    getCatList, getCat, postCat, cat_create_post, cat_update_put, cat_delete
};