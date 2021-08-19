const db = require("./db");

const User = require("./models/User");
const Pet = require("./models/Pet");
const Vet = require("./models/Vet");
const Task = require("./models/Task");
const Medication = require("./models/Medication");
//associations

module.exports = {
  db,
  models: {
    User,
    Pet,
    Vet,
    Task,
    Medication,
  },
};
