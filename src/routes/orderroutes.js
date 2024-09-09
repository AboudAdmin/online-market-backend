const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordercontroller');

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrder);
router.get('/orders/:id', orderController.getOrderById);
router.patch('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;