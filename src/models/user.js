const { Sequelize, DataTypes } = require("sequelize");

const db = require('./index.js');
const sequelize = db.sequelize;

const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true,
    },
    name : {
        type: DataTypes.STRING,
        allowNull :false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull:true,
    },
    phone: {
        type: DataTypes.INTEGER, // or INTEGER
        allowNull:false,
    },
    role: {
        type: DataTypes.ENUM(["admin","client","mederator"]),
        allowNull: false,
    }
 
});
module.exports = User;