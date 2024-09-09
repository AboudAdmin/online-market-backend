const express = require('express');
const router = express.Router();
const orderItemsController = require('../controllers/orderitemscontroller');
router.post('/orderitems', orderItemsController.createOrderItem);
router.get('/orderitems', orderItemsController.getAllOrderItems);
router.get('/orderitems:id', orderItemsController.getOrderItemById);
router.put('/orderitems/:orderitemsid', orderItemsController.updateOrderItem);
router.delete('/orderitems/:orderitemsid', orderItemsController.deleteOrderItem);

module.exports = router;
