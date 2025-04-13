const config = require("../config/config");
const mysql = require("mysql2");
const Sequelize = require("sequelize");


module.exports = db = {};

const { host, port, user, password, database } = config.database;
const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXIST ${database}`);

const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

db.sequelize = sequelize;

const User = require("./user.js");
const Category = require("./category.js");
const Product = require("./product.js");
const Photo = require("./photos.js");
const Contact = require("./contact.js");
const Reviews = require("./reviews.js");
const OrderItems = require("./orderitems.js");
const order = require("./order.js");
const Comment = require("./comment.js");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Photo);
Photo.belongsTo(Product);

Contact.belongsTo(User, { as: 'Sender', foreignKey: 'senderId' });
Contact.belongsTo(User, { as: 'Receiver', foreignKey: 'receiverId' });;

User.hasMany(Reviews);
Reviews.belongsTo(User);

Product.hasMany(Reviews);
Reviews.belongsTo(Product);

/*OrderItems.hasMany(product, order);
(product, order).belongsTo(OrderItems);*/
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Comment, { foreignKey: 'productId' });
Comment.belongsTo(Product, { foreignKey: 'productId' });


sequelize.sync({ force: false});

