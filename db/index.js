const db = require("./db");

const User = require("./models/User");
const Pet = require("./models/Pet");
const Vet = require("./models/Vet");
const Task = require("./models/Task");
const Medication = require("./models/Medication");
//associations

User.belongsToMany(Pet);
Pet.belongsToMany(User);

User.belongsToMany(Vet);
Vet.belongsToMany(User);
Pet.belongsToMany(Vet);
Vet.belongsToMany(Pet);

User.belongsToMany(Task);
Task.belongsToMany(User);
Pet.belongsToMany(Task);
Task.belongsToMany(Pet);

Pet.hasMany(Medication);
Medication.hasMany(Pet);

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
