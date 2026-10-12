
import { FaStar } from 'react-icons/fa6';
import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSendReviewsMutation } from '../../api/app_api';
import { useAuth } from '../../authentication/AuthProvider';
import resReviewSt from '../../styles/components/residence_review.module.css';
import Toast from '../common/Toast';

function ResidenceReview() {
  const [review, setReview] = useState('');
  const { user } = useAuth();

  const [handleReviews, { isLoading }] = useSendReviewsMutation();

  const submissionLock = useRef(false);
  const [toast, setToast] = useState(null);

  const { state } = useLocation();
  const res_id = state?.res_id;

  const [ratings, setRatings] = useState({
    landlord: 0,
    service: 0,
    infrastructure: 0,
  });

  const handleRatingChange = (category, value) => {
    setRatings((previous) => ({
      ...previous,
      [category]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (submissionLock.current || isLoading) return;

    if (!user) {
      setToast({
        title: 'Login required',
        content: 'Please log in before submitting a review.',
        type: 'error',
      });
      return;
    }

    if (!res_id) {
      setToast({
        title: 'Residence not selected',
        content: 'Please return to the residence page and try again.',
        type: 'error',
      });
      return;
    }

    if (!review.trim()) {
      setToast({
        title: 'Review required',
        content: 'Please write your review before submitting.',
        type: 'error',
      });
      return;
    }

    submissionLock.current = true;
    setToast(null);

    try {
      const reviewData = {
        res_id,
        review: review.trim(),
        ratings,
      };

      await handleReviews(reviewData).unwrap();

      setToast({
        title: 'Review submitted',
        content: 'Your review has been submitted successfully.',
        type: 'success',
      });

      setReview('');

      setRatings({
        landlord: 0,
        service: 0,
        infrastructure: 0,
      });
    } catch (err) {
      console.error('Review submission failed:', err);

      setToast({
        title: 'Submission failed',
        content:
          err?.data?.error?.message ||
          err?.data?.message ||
          err?.message ||
          'Your review could not be submitted. Please try again.',
        type: 'error',
      });
    } finally {
      submissionLock.current = false;
    }
  };

  const renderRating = (category, label) => (
    <div className={resReviewSt.star_rating_wrapper}>
      <p>{label}</p>

      <div className={resReviewSt.star_ratings}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={resReviewSt.ratingButton}
            aria-label={`${label}: ${star} star${star > 1 ? 's' : ''}`}
            aria-pressed={ratings[category] === star}
            onClick={() => handleRatingChange(category, star)}
          >
            <FaStar
              className={`${resReviewSt.star_icon} ${
                star <= ratings[category] ? resReviewSt.selected : ''
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={resReviewSt.container}>
      {toast && (
        <Toast
          title={toast.title}
          content={toast.content}
          type={toast.type}
        />
      )}

      <h1 className={resReviewSt.heading}>
        Write a residence review
      </h1>

      <section className={resReviewSt.rating_section}>
        <div className={resReviewSt.rating_wrapper}>
          {renderRating('landlord', 'Landlord')}
          {renderRating('service', 'Service')}
          {renderRating('infrastructure', 'Infrastructure')}
        </div>
      </section>

      <form
        className={resReviewSt.review_box_section}
        onSubmit={handleSubmit}
      >
        <label htmlFor="residence-review">
          Write Your Review
        </label>

        <textarea
          id="residence-review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tell us about your experience"
          maxLength={3000}
          required
        />

        <p className={resReviewSt.characterCount}>
          {review.length}/3000 characters
        </p>

        <button
          type="submit"
          disabled={isLoading || !review.trim()}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className={resReviewSt.loadingSpinner} />
              Submitting review...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </form>
    </div>
  );
}

export default ResidenceReview;