const order = require('../models/order');
exports.createOrder = async (req, res) => {
    try {
        const { date,total,status } = req.body;
        const nouvelleOrder = await order.create({ date,total,status });
        res.status(201).json(nouvelleOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getAllOrder = async (req, res) => {
    try {
        const Order = await Order.findAll();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrderById = async (req, res) => {
    try {
        const Order = await Order.findByPk(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "الطلب غير موجود" });
        } else {
            res.json(Order);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const { Date, status, total } = req.body;
        const Order = await Order.findByPk(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "الطلب غير موجود" });
        } else {
            await Order.update({ Date, status, total });
            res.json(Order);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteOrder = async (req, res) => {
    try {
        const Order = await Order.findByPk(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "الطلب غير موجود" });
        } else {
            await Order.destroy();
            res.json({ message: "تم حذف الطلب بنجاح" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};