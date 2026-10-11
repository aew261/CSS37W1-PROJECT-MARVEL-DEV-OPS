import { FaStar, FaLocationDot,  } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSendReviewsMutation } from "../../api/app_api";
import {useAuth} from '../../authentication/AuthProvider'
import resReviewSt from '../../styles/components/residence_review.module.css'
import ImagesOverlay from "../modal/ImagesOverlay";

function ResidenceReview() {
    const [review,setReview]=useState(null)
    const {user, session}=useAuth()

    const [handleReviews,{data,error,isLoading}]=useSendReviewsMutation()
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

    const handleSubmit=async()=>{
        if(review === null ){
            console.log("no review")  
            return; 
        } 
        try{
            const reviewData={
                res_id:res_id,
                review,
                ratings
            }

            const results= await handleReviews(reviewData).unwrap()
            console.log(results);
        }catch(error){
            console.log(error)
        }
    }




    useEffect(()=>{
        console.log("review",res_id)
    })
  return (<>
    <div className={resReviewSt.container}  >
        
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
            <button onClick={handleSubmit}  >
                Submit Review
            </button>
        </section>
    </div>
  </>)
}

export default ResidenceReview