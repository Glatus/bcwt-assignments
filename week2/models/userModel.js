'use strict';
const pool = require('../database/db');

const getAllUsers = async () => {
  try {
    const [users] = await pool.query(`SELECT user_id, name, email, role FROM wop_user`);
    return users;
  } catch (e) {
    console.error("error", e.message);
  }
};

const getUser = async (id) => {
  try {
    const [user] = await pool.query('SELECT user_id, name, email, role FROM wop_user WHERE user_id = ?', [id])
    return user
  } catch (e) {
    console.error("error", e.message);
    return;
  }
};
const addUser = async (user) => {
  console.log(user);
  try {
    const [result] = await pool.query('INSERT INTO wop_user (name, email, password, role) VALUES (?, ?, ?, 0)', [
      user.name,
      user.email,
      user.passwd
    ]);
    return result;
  } catch (e) {
    console.error("error", e.message);
    return;
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
      'SELECT * FROM wop_user WHERE email = ?;',
      params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getUser, getAllUsers, addUser, getUserLogin
};