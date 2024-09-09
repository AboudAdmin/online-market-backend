const OrderItems = require('../models/orderitems');
exports.createOrderItem = async (req, res) => {
  try {
    const { quantity, SubTotal } = req.body;
    const orderItem = await OrderItems.create({ quantity, SubTotal });
    res.status(201).send(orderItem);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItems.findAll();
    res.status(200).send(orderItems);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItems.findByPk(req.params.id);
    if (!orderItem) {
      return res.status(404).send({ message: 'OrderItem not found' });
    }
    res.status(200).send(orderItem);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateOrderItem = async (req, res) => {
  try {
    const { quantity, SubTotal } = req.body;
    const [updated] = await OrderItems.update({ quantity, SubTotal }, {
      where: { id: req.params.id },
      returning: true
    });
    if (!updated) {
      return res.status(404).send({ message: 'OrderItem not found' });
    }
    res.status(200).send(updated);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.deleteOrderItem = async (req, res) => {
  try {
    const deleted = await OrderItems.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).send({ message: 'OrderItem not found' });
    }
    res.status(200).send({ message: 'OrderItem deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};
