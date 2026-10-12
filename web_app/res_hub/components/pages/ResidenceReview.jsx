
import { FaStar } from "react-icons/fa6";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSendReviewsMutation } from "../../api/app_api";
import resReviewSt from "../../styles/components/residence_review.module.css";
import Toast from "../common/Toast";

function ResidenceReview() {
    const [review, setReview] = useState("");
    const [toast, setToast] = useState(null);

    const { state } = useLocation();
    const res_id = state?.res_id;

    const submissionLock = useRef(false);

    const [handleReviews, { isLoading }] =
        useSendReviewsMutation();

    const [ratings, setRatings] = useState({
        landlord: 0,
        service: 0,
        infrastructure: 0
    });

    const handleRatingChange = (category, value) => {
        setRatings((prev) => ({
            ...prev,
            [category]: value
        }));
    };

    const handleSubmit = async () => {
        if (submissionLock.current || isLoading) {
            return;
        }

        if (!res_id) {
            setToast({
                title: "Error",
                content: "Residence information is missing. Please select a residence again.",
                type: "error"
            });
            return;
        }

        if (!review.trim()) {
            setToast({
                title: "Error",
                content: "Please write your review before submitting.",
                type: "error"
            });
            return;
        }

        submissionLock.current = true;
        setToast(null);

        try {
            const reviewData = {
                res_id,
                review: review.trim(),
                ratings
            };

            await handleReviews(reviewData).unwrap();

            setReview("");

            setRatings({
                landlord: 0,
                service: 0,
                infrastructure: 0
            });

            setToast({
                title: "Success",
                content: "Your review has been submitted successfully!",
                type: "success"
            });
        } catch (err) {
            console.error("Review submission failed:", err);

            setToast({
                title: "Error",
                content:
                    err?.data?.message ||
                    err?.data?.error?.message ||
                    err?.message ||
                    "Your review could not be submitted. Please try again.",
                type: "error"
            });
        } finally {
            submissionLock.current = false;
        }
    };

    const ratingCategories = [
        { key: "landlord", label: "Landlord" },
        { key: "service", label: "Service" },
        { key: "infrastructure", label: "Infrastructure" }
    ];

    return (
        <div className={resReviewSt.container}>
            {toast && (
                <Toast
                    title={toast.title}
                    content={toast.content}
                    type={toast.type}
                />
            )}

            <h1 style={{ textAlign: "center" }}>
                Write a residence review
            </h1>

            <section className={resReviewSt.rating_section}>
                <div className={resReviewSt.rating_wrapper}>
                    {ratingCategories.map((category) => (
                        <div
                            className={resReviewSt.star_rating_wrapper}
                            key={category.key}
                        >
                            <p>{category.label}</p>

                            <div className={resReviewSt.star_ratings}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        aria-label={`${category.label}: ${star} stars`}
                                        aria-pressed={
                                            ratings[category.key] === star
                                        }
                                        className={resReviewSt.ratingButton}
                                        onClick={() =>
                                            handleRatingChange(
                                                category.key,
                                                star
                                            )
                                        }
                                    >
                                        <FaStar
                                            className={`${resReviewSt.star_icon} ${
                                                star <= ratings[category.key]
                                                    ? resReviewSt.selected
                                                    : ""
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={resReviewSt.review_box_section}>
                <p>Write Your Review</p>

                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us about your experience"
                    maxLength={2000}
                />

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Submitting Review..."
                        : "Submit Review"}
                </button>
            </section>
        </div>
    );
}

export default ResidenceReview;