const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("User", {
  username: {},
  password: {},
  firstName: {},
  lastName: {},
  email: {},
  image: {},
  address: {},
  phone: {},
  zip: {},
});
