const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentcontroller');

router.post('/comment', commentController.createComment);
router.get('/comment/:productId', commentController.getAllCommentsByProductId);
router.get('/comment/:id', commentController.getCommentById);
router.delete('/comment/:id', commentController.deleteComment);

module.exports = router;
