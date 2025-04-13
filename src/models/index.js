const config = require("../config/config");
const { Sequelize } = require("sequelize");

module.exports = db = {};

const { host, port, user, password, database } = config.database;

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
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
const Order = require("./order.js");
const Comment = require("./comment.js");

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Photo);
Photo.belongsTo(Product);

User.hasMany(Contact);
Contact.belongsTo(User);

User.hasMany(Reviews);
Reviews.belongsTo(User);

Product.hasMany(Reviews);
Reviews.belongsTo(Product);

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Comment, { foreignKey: "productId" });
Comment.belongsTo(Product, { foreignKey: "productId" });

Order.hasMany(OrderItems, { foreignKey: "orderId" });
OrderItems.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItems, { foreignKey: "productId" });
OrderItems.belongsTo(Product, { foreignKey: "productId" });

sequelize
  .sync({ force: false }) 
  .then(() => console.log("Database & tables synced"))
  .catch((err) => console.error("Error syncing database:", err));
