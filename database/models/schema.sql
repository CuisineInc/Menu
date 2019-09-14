
DROP TABLE IF EXISTS restaurants;

DROP TABLE IF EXISTS meals;

CREATE TABLE meals (
  id SERIAL,
  restaurant_id INTEGER NOT NULL,
  food_option VARCHAR(50) NOT NULL,
  food_category VARCHAR(50) NOT NULL,
  meal_name VARCHAR(50) NOT NULL,
  meal_description VARCHAR(250) NOT NULL,
  meal_price SMALLINT NOT NULL
);
