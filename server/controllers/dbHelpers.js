const { Pool, Client } = require('pg');
const pconfig = require('../../database/models/postgres_config.js');
const pool = new Pool(pconfig);

module.exports = {
  saveMenuItem: (data, callback) => {
    const query = `INSERT INTO menus(restaurant_id,food_option,food_category,meal_name,meal_description,meal_price) VALUES($1,$2,$3,$4,$5,$6)`
    pool.query(query, data, (err) => {
      if (err) callback(err);
      callback(null);
    });
  },

  getMenuItems: (rID, callback) => {
    const query = `SELECT * FROM menus WHERE restaurant_id = ${rID}`;
    pool.query(query, (err, res) => {
      if (err) callback(err);
      else callback(null, res.rows);
    });
  },

  updateMenuItem: () => {
    const query = `SELECT NOW()`
    pool.query(query, (err) => {
      if (err) callback(err);
      callback(null);
    })
  },

  deleteMenuItem: (mealID, callback) => {
    const query = `SELECT NOW()`
    pool.query(query, (err) => {
      if (err) callback(err);
      callback(null);
    })
  }
}