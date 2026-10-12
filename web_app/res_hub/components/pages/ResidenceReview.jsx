import { FaStar, FaLocationDot,  } from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSendReviewsMutation } from "../../api/app_api";
import {useAuth} from '../../authentication/AuthProvider'
import resReviewSt from '../../styles/components/residence_review.module.css'
import Toast from "../common/Toast";
import ImagesOverlay from "../modal/ImagesOverlay";

function ResidenceReview() {
    const [review,setReview]=useState(null)
    const {user, session}=useAuth()

    const [handleReviews,{data,error,isLoading}]=useSendReviewsMutation()
    const submissionLock = useRef(false); 
    const [toast,setToast]=useState(null);
    const { state } = useLocation();
    const res_id = state?.res_id;

    const [ratings,setRatings]=useState({
        landlord:0,
        service:0,
        infrastructure:0
    })

    const handleRatingChange = (category, value) => {
        setRatings((prev) => ({
            ...prev,
            [category]: value,
        }));
    };

    const handleSubmit = async () => {
        // Stop repeated clicks before another request can start.
        if (submissionLock.current || isLoading) {
        return;
        }

        // Check that the review has actual text.
        if (!review || !review.trim()) {
        setToast({ title: "Error", content: "Please write your review before submitting.", type: "error", });
        return;
        }

        // Ensure that a residence was selected.
        if (!res_id) {
        setToast({
        title: "Error",
        content: "Residence information is missing. Please select a residence again.",
        type: "error",
        });
        return;
        }

        submissionLock.current = true;
        setToast(null);

        try {
        const reviewData = {
        res_id: res_id,
        review: review.trim(),
        ratings: ratings,
        };

        await handleReviews(reviewData).unwrap();

        setToast({
        title: "Success",
        content: "Your review has been submitted successfully!",
        type: "success",
        });

        // Clear the form after successful submission.
        setReview("");

        setRatings({
        landlord: 0,
        service: 0,
        infrastructure: 0,
        });

        } catch (err) {
        console.error("Review submission failed:", err);

        setToast({title: "Error",content:
        err?.data?.message ||
        err?.data?.error?.message ||
        "Your review could not be submitted. Please try again.",
        type: "error",
        });

        } finally {
        submissionLock.current = false;
        }
    };

    useEffect(()=>{
        console.log("review",res_id)
    })
  return (<>
    <div className={resReviewSt.container}  >
        {toast && ( <Toast title={toast.title} content={toast.content} type={toast.type}/>
)}
        <h1 style={{textAlign:"center"}}  >
            Write a residence review 
        </h1>

        <section className={resReviewSt.rating_section}  >
            <div  className={resReviewSt.rating_wrapper}  >

                <div className={resReviewSt.star_rating_wrapper}  >
                    <p>Landlord</p>
                    <div  className={resReviewSt.star_ratings}  >
                        {[1,2,3,4,5].map((star,ind)=>(
                            <button 
                                key={ind}
                                className={resReviewSt.ratingButton}
                                onClick={()=>handleRatingChange("landlord",star)}
                            >
                                <FaStar className={`${resReviewSt.star_icon}
                                         ${ star <= ratings.landlord? resReviewSt.selected: ""}`}  
                                />
                            </button> 
                        ))}
                    </div>
                </div>

                <div className={resReviewSt.star_rating_wrapper}  >
                    <p>Service</p>
                    <div  className={resReviewSt.star_ratings}  >
                        {[1,2,3,4,5].map((star,ind)=>(<>
                            <button 
                                key={ind}
                                className={resReviewSt.ratingButton}
                                onClick={()=>handleRatingChange("service",star)}
                                
                            >
                               
                                <FaStar className={`${resReviewSt.star_icon}
                                         ${ star <= ratings.service? resReviewSt.selected: ""}`}  
                                />
                            </button> 
                       </>))}
                    </div>
                </div>

                <div className={resReviewSt.star_rating_wrapper}  >
                    <p>Infrastructure</p>
                    <div  className={resReviewSt.star_ratings}  >
                        {[1,2,3,4,5].map((star, ind)=>(
                            <button 
                                key={ind}
                                className={resReviewSt.ratingButton}
                                onClick={()=>handleRatingChange("infrastructure",star)}
                                
                            >
                                <FaStar className={`${resReviewSt.star_icon}
                                         ${ star <= ratings.infrastructure? resReviewSt.selected: ""}`}  
                                />
                            </button> 
                        ))}
                    </div>
                </div>


            </div>

        </section>

        <section  className={resReviewSt.review_box_section} >
            <p>Write Your Review</p>
            <textarea  
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us about your experience"
                    
            />
            <button
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? "Submitting Review..." : "Submit Review"}
            </button>

        </section>

    </div>
  </>)
}

export default ResidenceReview