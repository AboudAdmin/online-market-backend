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
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
      len: [5, 100],
      

    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
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
