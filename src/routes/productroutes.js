const express = require('express');
const router = express.Router();
const productController = require('../controllers/productcontroller');

router.post('/product',productController.upload.single('img'), productController.createproduct);
router.get('/product', productController.getallproduct);

router.get('/product/category/:categoryid', productController.getproductsByCategoryId);

router.get('/product/:id', productController.getproductById);
router.put('/products/:id', productController.updateproduct);
router.delete('/products/:id', productController.deleteproduct);

module.exports = router;