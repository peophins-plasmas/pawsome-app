const Sequelize = require("sequelize");
const db = require("../db");

const Vet = db.define("Vet", {
  vetName: {},
  email: {},
  addressLine1: {},
  addressLine2: {},
  city: {},
  state: {},
  zip: {},
  phoneNum: {},
  hours: {},
});
