const { Sequelize, DataTypes } = require("sequelize");
const db = require('./index.js'); 
const sequelize = db.sequelize;

const OrderItems = sequelize.define('OrderItems',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },   
    quantity:{
        type: DataTypes.INTEGER,
        validate:{
            min:0
        }
    },
    SubTotal :{
        type: DataTypes.DECIMAL,
        allowNull : false,
    },
})

module.exports = OrderItems;