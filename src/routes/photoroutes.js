const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photocontroller');

router.post('/photo', photosController.createPhoto);
router.get('/photo/:productid', photosController.getAllPhotosByProductId);
router.get('/photo/:photoid', photosController.getPhotoById);
router.delete('/:photoid', photosController.deletePhoto);

module.exports = router;
