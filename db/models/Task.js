const Sequelize = require("sequelize");
const db = require("../db");

const Task = db.define("Task", {
  description: {},
  dueDate: {},
  dueTime: {},
  frequency: {},
});
