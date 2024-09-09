const { Sequelize, DataTypes } = require("sequelize");
const db = require('./index.js'); 
const sequelize = db.sequelize;
const Category = sequelize.define('category',{
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name : {
        type: DataTypes.STRING,
        allowNull : false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Category;