require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const db = require('./controllers/dbHelpers.js');

const app = express();
const port = 3004;

app.use(compression());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));
app.use('/restaurants/:id', express.static('public'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/api/restaurants/:id/menu', (req, res) => {
  const rID = req.params.id;
  db.getMenuItems(rID, (err, data) => {
    if (err) {
      throw err;
      res.status(500).send(err);
    }    const menu = {};
    for (var i = 0; i < data.length; i ++) {
      food_option = data[i].food_option;
      food_category = data[i].food_category;
      meal_name = data[i].meal_name;
      meal_description = data[i].meal_description;
      meal_price = data[i].meal_price;
      if (!menu[food_option]) {
        menu[food_option] = {};
        menu[food_option][food_category] = {};
        menu[food_option][food_category][meal_name] = {};
        menu[food_option][food_category][meal_name]['description'] = meal_description;
        menu[food_option][food_category][meal_name]['price'] = meal_price/100;
      }
      if (!menu[food_option][food_category]) {
        menu[food_option][food_category] = {};
        menu[food_option][food_category][meal_name] = {};
        menu[food_option][food_category][meal_name]['description'] = meal_description;
        menu[food_option][food_category][meal_name]['price'] = meal_price/100;

      } else {
        menu[food_option][food_category][meal_name] = {};
        menu[food_option][food_category][meal_name]['description'] = meal_description;
        menu[food_option][food_category][meal_name]['price'] = meal_price/100;
      }
    }
    const menuData = [];
    const item = {};
    for (var key in menu) {
      item[key] = menu[key];
      menuData.push(item)
    }
    // res.status(200).send(menuData);
    res.send(menuData);
  });
});

app.post('/api/restaurants/:id/menu', (req, res) => {
  const meal = [];
  for (var key in req.body) {
    meal.push(req.body[key]);
  }
  db.saveMenuItem(meal, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send('Success Meal Insert');
  });
});

app.put('/api/restaurants/:id/menu', (req, res) => {
  const mealID = req.body.id;
  db.updateMenuItem(mealID, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send('Success Meal Delete');
  })
});

app.delete('/api/restaurants/:id/menu', (req, res) => {
  const mealID = req.query.id;
  db.deleteMenuItem(mealID, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send('Success Meal Delete');
  })
});

app.listen(port, () => { console.log(`server ${port} is listening...`); });

module.exports.app = app;
