const { Sequelize, DataTypes } = require("sequelize");
const db = require('./index.js'); 
const sequelize = db.sequelize;

const Contact = sequelize.define('contact',{
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    message : {
        type: DataTypes.TEXT,
        allowNull : false,
        
    },
    date: {
        type: DataTypes.DATE,   
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = Contact;