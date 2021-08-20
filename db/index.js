const db = require("./db");

const User = require("./models/User");
const Pet = require("./models/Pet");
const Vet = require("./models/Vet");
const Task = require("./models/Task");
const Medication = require("./models/Medication");
//associations

User.hasMany(Pet);
Pet.belongsTo(User);

User.hasOne(Vet);
Vet.hasMany(User);
Pet.hasOne(Vet);
Vet.hasMany(Pet);

User.hasMany(Task);
Task.belongsTo(User);
Pet.hasMany(Task);
Task.belongsTo(Pet);

Pet.hasMany(Medication);
Medication.belongsTo(Pet);

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
