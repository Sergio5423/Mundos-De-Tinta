const config = require("./config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  'mundosdetinta','admin','admin', {
    host: 'localhost',
  dialect: "mysql",
});
module.exports = sequelize;
