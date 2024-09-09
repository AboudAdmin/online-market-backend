const { Sequelize, DataTypes } = require("sequelize");
const db = require('./index.js'); 
const sequelize = db.sequelize;

const Reviews = sequelize.define('reviews',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    date: {
        type: DataTypes.DATE,   
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    comment : {
        type: DataTypes.TEXT,
        allowNull: true,
        valdaite: {
            len : [3 , 300]
        }
    },
    note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
});
module.exports = Reviews;