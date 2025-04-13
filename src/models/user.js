const { Sequelize, DataTypes } = require("sequelize");
const db = require('./index.js');
const sequelize = db.sequelize;

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING, // Changed from INTEGER to STRING for compatibility
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "client", "moderator"), // Fixed typo in "moderator"
        allowNull: false,
    },
    isBanned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false, // Changed to false to ensure consistency
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
}, {
    timestamps: true, // Enable automatic timestamps
});

module.exports = User;