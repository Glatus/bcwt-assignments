'use strict';
// userController
const userModel = require('../models/userModel');

const users = userModel.users;

const getUserList = (req,res) => {
    users.forEach(user => delete user.password);
    res.json(users);
};
const getUser = (req,res) => {
    users.forEach(user => delete user.password);
    res.json(users.filter(user => user.id === req.params.id))
};
const postUser = (req,res) => {
    console.log(req.body);
}
module.exports = {
    getUserList,getUser,postUser
};