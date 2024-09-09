const Comment = require('../models/comment'); 

exports.createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body); 
    res.status(201).send(newComment);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllCommentsByProductId = async (req, res) => {
  try {
    const comments = await Comment.findAll({ where: { productId: req.params.productId } }); 
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id); 
    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.destroy({ where: { id: req.params.id } }); 
    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }
    res.status(200).send({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
