const {Sequelize, DataTypes} = require("sequelize");
const db = require('./index.js')
const sequelize = db.sequelize;
const product = sequelize.define('product',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    price:{
        type: DataTypes.FLOAT,
        validate:{
            min:0
        }
    },
    quantity:{
        type: DataTypes.INTEGER,
        validate:{
            min:0
        }
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    marque:{
        type: DataTypes.STRING,
    },
    statut: {
        type: DataTypes.ENUM(["public","prive"]),
        allowNull: false,
    }
});
module.exports = product;