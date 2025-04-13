const order = require('../models/order');
const OrderItems = require('../models/orderitems');

exports.createOrder = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            country,
            city,
            address,
            postalCode,
            
            total,
            status,
            items
        } = req.body;
        console.log(req.body);

        const nouvelleOrder = await order.create({
            fullName,
            email,
            phone,
            country,
            city,
            address,
            postalCode,
            date,
            total,
            status
        });
        // const orderItems = await Promise.all(
        //     items.map(item => 
        //       OrderItems.create({
        //         OrderId: nouvelleOrder.id,
        //         ProductId: item.id,
        //         quantity: item.quantity,
        //         subTotal: item.price * item.quantity
        //       })
        //     )
        //   );

         res.status(201).json(nouvelleOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllOrder = async (req, res) => {
    try {
        const orders = await order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const Order = await order.findByPk(req.params.id);
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
        const {
            fullName,
            email,
            phone,
            country,
            city,
            address,
            postalCode,
            date,
            total,
            status
        } = req.body;

        const Order = await order.findByPk(req.params.id);
        if (!Order) {
            res.status(404).json({ message: "الطلب غير موجود" });
        } else {
            await Order.update({
                fullName,
                email,
                phone,
                country,
                city,
                address,
                postalCode,
                date,
                total,
                status
            });
            res.json(Order);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const Order = await order.findByPk(req.params.id);
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
