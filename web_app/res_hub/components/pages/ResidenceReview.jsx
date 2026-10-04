import { FaStar, FaLocationDot,  } from "react-icons/fa6";
import resReviewSt from '../../styles/components/residence_review.module.css'

function ResidenceReview() {
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
                        {[1,2,3,4,5].map((star)=>(
                            <FaStar className={resReviewSt.star_icon}  />
                        ))}
                    </div>
                </div>

                <div className={resReviewSt.star_rating_wrapper}  >
                    <p>Service</p>
                    <div  className={resReviewSt.star_ratings}  >
                        {[1,2,3,4,5].map((star)=>(
                            <FaStar className={resReviewSt.star_icon}  />
                        ))}
                    </div>
                </div>

                <div className={resReviewSt.star_rating_wrapper}  >
                    <p>Infrastructure</p>
                    <div  className={resReviewSt.star_ratings}  >
                        {[1,2,3,4,5].map((star)=>(
                            <FaStar className={resReviewSt.star_icon}  />
                        ))}
                    </div>
                </div>


            </div>

        </section>

        <section  className={resReviewSt.review_box_section} >
         Write Your Review
         <textarea/>
         <button>
            Submit Review
         </button>
        </section>
    </div>
  </>)
}

export default ResidenceReview