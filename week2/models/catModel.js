'use strict';
const pool = require('../database/db');
const getAllCats = async (req) => {
  try {
    const ownerId = req.user.user_id;
    const [cats] = await pool.query(`
      SELECT c.cat_id, c.name,c.weight,c.filename, c.birthdate,c.owner, u.name AS ownername
      FROM wop_cat AS c
      LEFT JOIN wop_user AS u
      ON c.owner = u.user_id
      WHERE c.owner = ?
    `, [ownerId]);
    return cats;
  } catch (e) {
    console.error("error", e.message);
  }
};


const getCat = async (id) => {
  try {
    const [cat] = await pool.query('SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
    return cat;
  } catch (e) {
    console.error("error", e.message);
    return null;
  }
};


const addCat = async (cat) => {
  try {
    const [result] = await pool.query('INSERT into wop_cat (name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)', [
      cat.body.name,
      cat.body.weight,
      cat.body.owner,
      cat.file.filename,
      cat.body.birthdate
    ]);
    return result;
  } catch (e) {
    console.error("error", e.message);
    return;
  }
};
const updateCat = async (cat, userId, isAdmin) => {
  try {
    let query;
    if (isAdmin) {
      query = 'UPDATE wop_cat SET name=?, weight=?, owner=?, birthdate=? WHERE cat_id=?';
    } else {
      query = 'UPDATE wop_cat SET name=?, weight=?, birthdate=? WHERE cat_id=? AND owner=?';
    }
    const [result] = await pool.query(query, [
      cat.name,
      cat.weight,
      cat.birthdate,
      cat.id,
      userId,
    ]);
    return result;
  } catch (e) {
    console.error("error", e.message);
    return;
  }
};

const deleteCat = async (id, userId, isAdmin) => {
  try {
    let query;
    if (isAdmin) {
      query = 'DELETE FROM wop_cat WHERE cat_id=?';
    } else {
      query = 'DELETE FROM wop_cat WHERE cat_id=? AND owner=?';
    }
    const [result] = await pool.query(query, [id, userId]);
    console.log(`Cat ${getCat(id).name} deleted!`);
    return result;
  } catch (e) {
    console.error("error", e.message);
    return;
  }
};

module.exports = {
  getCat, getAllCats, addCat, updateCat, deleteCat
};