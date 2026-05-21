// components/ReviewModal.js
import React, { useState } from 'react';
import axios from 'axios';

const ReviewModal = ({ isOpen, onClose, recipientId, projectId, role, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      
      await axios.post(
        'http://localhost:5000/api/reviews/submit', 
        { 
          recipientId, 
          projectId, 
          rating, 
          comment, 
          reviewerRole: role // Passed from parent (e.g., 'Trainer')
        },
        { 
          headers: { 
            Authorization: `Bearer ${token}` 
          } 
        }
      );
      
      alert("Review submitted successfully!");
      
      // Reset form
      setRating(5);
      setComment('');
      
      // Notify parent to refresh data if necessary
      if (onReviewSubmitted) onReviewSubmitted();
      onClose();
      
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <h3>Rate your experience</h3>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Rating (1-5)</label>
            <input 
              type="number" 
              min="1" 
              max="5" 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Your Feedback</label>
            <textarea 
              rows="4"
              placeholder="What was it like working with them?"
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              required 
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="logout-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="apply-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;