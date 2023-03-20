'use strict';
// userController
const userModel = require('../models/userModel');

const users = userModel.users;

const getUserList = (req,res) => {
    res.json(users);
};
const getUser = (req,res) => {
    res.json(users.filter(user => user.id === req.params.id) )
    console.log(req);
};
module.exports = {
    getUserList,getUser
};