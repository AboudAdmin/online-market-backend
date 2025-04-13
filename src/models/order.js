const { Sequelize, DataTypes } = require("sequelize");
const db = require("./index.js");
const sequelize = db.sequelize;

const order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(["en attente", "payé", "envoyé", "reçu"]),
    allowNull: false,
    defaultValue: 'en attente'
  },
});

module.exports = order;
