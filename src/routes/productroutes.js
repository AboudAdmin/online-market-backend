const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');

router.post('/product', productController.createproduct);
router.get('/product', productController.getallproduct);

router.get('/products/:productid', productController.getproductById);
router.put('/products/:productid', productController.updateproduct);
router.delete('/products/:productid', productController.deleteproduct);

module.exports = router;