const { Sequelize, DataTypes } = require("sequelize");
const db = require("./index.js");
const sequelize = db.sequelize;


const Photos = sequelize.define("photos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
});

module.exports = Photos;
