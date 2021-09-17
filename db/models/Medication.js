const Sequelize = require("sequelize");
const db = require("../db");

const Medication = db.define("Medication", {
  startDate: {},
  endDate: {},
  instructions: {},
  dosage: {},
  medicationName: {},
  medicationNickname: {},
});
