const Sequelize = require("sequelize");
const db = require("../db");

const Pet = db.define("Pet", {
  petName: {},
  sex: {},
  species: {},
  image: {},
  weight: {},
  units: {},
  birthday: {},
  features: {},
  likes: {},
  dislikes: {},
  behavior: {},
  dryFoodBrand: {},
  wetFoodBrand: {},
  amountDryFood: {},
  amountWetFood: {},
  dailyTreatLimit: {},
  //what do i put here if there is an association
  medications: {},
  allergies: {},
  additionalInfo: {},
});
