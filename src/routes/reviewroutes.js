const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewcontroller');
router.post('/review', reviewController.createReview);
router.get('/review/:reviewsId', reviewController.getAllReviewsproductid);
router.get('/review/:reviewid', reviewController.getReviewById);
router.put('/review/:reviewid', reviewController.updateReview);
router.delete('/review/:reviewid', reviewController.deleteReview);

module.exports = router;
