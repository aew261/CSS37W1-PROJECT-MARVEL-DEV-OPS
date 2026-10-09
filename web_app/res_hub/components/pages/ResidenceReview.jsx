import { FaStar, FaLocationDot,  } from "react-icons/fa6";
import { useState, useEffect } from "react";

import resReviewSt from '../../styles/components/residence_review.module.css'
import ImagesOverlay from "../modal/ImagesOverlay";

function ResidenceReview() {
    const [review,setReview]=useState(null)
    

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

    useEffect(()=>{
        console.log(ratings)
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
            <button>
                Submit Review
            </button>
        </section>
    </div>
  </>)
}

export default ResidenceReview