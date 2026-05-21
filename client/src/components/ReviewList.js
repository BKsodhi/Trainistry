// components/ReviewList.js
import React from 'react';

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted">No reviews/testimonials available yet.</p>;
  }

  return (
    <div className="review-container">
      {reviews.map((review) => (
        <div key={review._id} className="review-card">
          <div className="stars">{"★".repeat(review.rating)}</div>
          <p>"{review.comment}"</p>
          <small>- {review.reviewerName}</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;