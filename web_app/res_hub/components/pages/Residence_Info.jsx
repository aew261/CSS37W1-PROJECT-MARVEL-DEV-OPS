import { FaStar, FaLocationDot,  } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTimeAgo } from "../../hooks/useTimeAgo";
import { useFetchResInfoQuery, useFetchReviewsQuery } from "../../api/app_api";
import { useAuth } from "../../authentication/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { setReviews, deleteReview } from "../../redux/reviews";
import {supabase} from '../../lib/supabase'
import ResImages from "../../composites/components/ResImages";
import residenceSt from '../../styles/components/residence_info.module.css'
import ImagesOverlay from "../modal/ImagesOverlay";

function Residence_Info() {
    const navigate=useNavigate()

    const [showModal,setShowModal]=useState(false)
    const {user}=useAuth()
    const { state } = useLocation();
    const res_id = state?.id;

    const dispatch=useDispatch()


   const {data,error,isLoading}=useFetchResInfoQuery(res_id);
   const {data:reviewData,error:reviewError, isLoading:reviewLoading}=useFetchReviewsQuery(res_id)

   const reviews=useSelector((state)=>state.review.reviews)
   useEffect(()=>{
    if(data){
        console.log(data) 
    }

    if(error){
        console.log(error)
    }
       
    },[data,error])

    useEffect(()=>{

        if(reviewData){
            dispatch(setReviews(reviewData?.data || []))
            //console.log(reviews)
        }

        if(reviewError){
            console.log(reviewError)
        }
        
    },[reviewData, dispatch,reviews])

    useEffect(() => {
        if (reviewData) {
            dispatch(setReviews(reviewData?.data || []));
        }

        if (reviewError) {
            console.log(reviewError);
        }
    }, [reviewData, reviewError, dispatch]);

    useEffect(()=>{
        console.log("review",reviews)
    })

    

    const handleDelete = async (id) => {
        dispatch(deleteReview(id));
    try {
        const { data, error } = await supabase
            .from("reviews")
            .delete()
            .eq("id", id)
            .select();
         
        if (error) {
            console.error("Failed to delete review:", error.message);
            return;
        }

        console.log("Deleted review:", data);

        
       
    } catch (error) {
        console.error("Unexpected error:", error);
    }
};
   
    


  return (<>
    <div className={residenceSt.container}  >
        {showModal && <ImagesOverlay setShowModal={setShowModal}  images={data?.data?.res_images}  />}
        <section className={residenceSt.top_section} >
            <button onClick={()=>navigate('/residence_review',{ state: { res_id }} )}  >
                <p>Write a Review</p>
            </button>
        </section>
 
        <main>

            <section  className={residenceSt.info_section}  >
                <h2>{data?.data?.res_name}</h2>

                <div className={residenceSt.info_wrapper}  >

                    <div className={residenceSt.rating_wrapper}  >
                        {[...Array(5)].map((_,ind)=>(
                            <FaStar 
                                key={ind} 
                                 className={ ind < data?.data?.overall_rating || 0 ?
                                            residenceSt.selected : residenceSt.rating_icon }
                                />
                        ))}
                    </div>

                    <p>{data?.data?.overall_rating}  {`(${data?.data?.total_ratings} reviews)`}</p>
                </div>

                <div className={residenceSt.info_wrapper}>
                    <FaLocationDot className={residenceSt.info_icon} />
                    <p>{data?.data?.address}</p>
                </div>

            </section>

            <section className={residenceSt.preview_section}  >

                <div className={residenceSt.category_section}  >
                    <h2>Category Ratings</h2>

                    <div className={residenceSt.category_wrapper} >
                        <div  className={residenceSt.category}  >
                            <p>Landlord</p>
                            {[...Array(5)].map((_,ind)=>(
                                <FaStar key={ind} 
                                className={ ind < data?.data?.landlord_rating || 0 ?
                                            residenceSt.selected : residenceSt.rating_icon }
                                
                               />
                            ))}
                        </div>

                        <div  className={residenceSt.category}  >
                            <p>Infrastructure</p>
                            {[...Array(5)].map((_,ind)=>(
                                <FaStar 
                                    key={ind} 
                                     className={ ind < data?.data?.infrastructure_rating || 0 ?
                                            residenceSt.selected : residenceSt.rating_icon }
                                />
                            ))}
                        </div>

                        <div  className={residenceSt.category}  >
                            <p>Service</p>
                            {[...Array(5)].map((_,ind)=>(
                                <FaStar 
                                    key={ind}
                                     className={ ind < data?.data?.service_rating || 0 ?
                                            residenceSt.selected : residenceSt.rating_icon }
                            />
                            ))}
                        </div>

                    </div>

                </div>

                <div className={residenceSt.photos_section}  >
                    <h2>Photos</h2>
                    <ResImages images={data?.data?.res_images} setShowModal={setShowModal}  />
                </div>

            </section>

            <section className={residenceSt.review_section}   >
                <h2>Student Reviews</h2>
                <p>Reviews Submitted by verified wsu students</p>

                <div className={residenceSt.review_wrapper}  >

                 {reviews?.map((item, ind) => (
                    <div className={residenceSt.review_card} key={item.id ?? ind}>
                        <div className={residenceSt.review_info}>
                            <p>
                                {item?.first_name} {item?.last_name}
                            </p>

                            <p>
                                {useTimeAgo(item.created_at).type === "relative"
                                    ? `${useTimeAgo(item.created_at).value} ago`
                                    : `${useTimeAgo(item.created_at).date} at ${
                                        useTimeAgo(item.created_at).time
                                    }`}
                            </p>
                        </div>

                        <div className={residenceSt.review_content}>
                            <p>{item?.comment}</p>
                        </div>

                        {(user.user_id === item.user_id) &&
                            (<div className={residenceSt.review_actions}>
                                <button
                                    type="button"
                                    className={residenceSt.delete_button}
                                    onClick={()=>handleDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </div>)
                        }
                    </div>))
                 }
                    
                </div>

            </section>


        </main>


    </div>
  </>)
}

export default Residence_Info