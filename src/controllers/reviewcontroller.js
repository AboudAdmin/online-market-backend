const Review = require('../models/reviews'); 


exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.getAllReviewsproductid = async (req, res) => {
  try {  
    const reviewsId = req.params.reviewsId

    const reviews = await Review.findAll({
      where:{reviewsId:reviewsId}
    });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
};
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    res.status(200).send(review);
  } catch (error) {
    res.status(500).send(error);
  }
};
