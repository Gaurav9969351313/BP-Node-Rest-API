const express = require('express');
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/review.controller');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getReviews)
  .post(addReview);

router
  .route('/:id')
  .get(getReview)
  .put(updateReview)
  .delete(deleteReview);

module.exports = router;