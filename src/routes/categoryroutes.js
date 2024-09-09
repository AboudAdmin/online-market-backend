const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorycontroller');

router.get('/category', categoryController.getAllcategory);
router.get('/category/:categoryID', categoryController.getcategoryById);
router.post('/category', categoryController.createcategory);
router.put('/category/:categoryID', categoryController.updatecategory);
router.delete('/category/:categoryID', categoryController.deletecategory);

module.exports = router;