import { FaStar, FaLocationDot,  } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTimeAgo } from "../../hooks/useTimeAgo";
import { useFetchResInfoQuery, useFetchReviewsQuery } from "../../api/app_api";


import ResImages from "../../composites/components/ResImages";
import residenceSt from '../../styles/components/residence_info.module.css'
import ImagesOverlay from "../modal/ImagesOverlay";

function Residence_Info() {
    const navigate=useNavigate()

    const [showModal,setShowModal]=useState(false)

    const { state } = useLocation();
    const res_id = state?.id;

    

   const {data,error,isLoading}=useFetchResInfoQuery(res_id);
   const {data:reviewData,error:reviewError, isLoading:reviewLoading}=useFetchReviewsQuery(res_id)

   useEffect(()=>{
    if(data){
        console.log(data) 
    }

    if(error){
        console.log(error)
    }
       
    },[data,error])

    useEffect(()=>{
        //console.log("info: ", res_id)
    })

   
    


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

                    {reviewData?.data.map((item,ind)=>(
                        <div className={residenceSt.review_card}   >
                            <div className={residenceSt.review_info}  >
                                <p>{item?.first_name} {`${item?.last_name}`} </p>
                                <p>
                                   {useTimeAgo(item.created_at).type === "relative"
                                    ? `${useTimeAgo(item.created_at).value} ago`
                                    : `${useTimeAgo(item.created_at).date} at ${
                                        useTimeAgo(item.created_at).time
                                    }`} 
                                </p>
                            </div>
                            <div className={residenceSt.review_content}   >
                            <p>{item?.comment} </p> 

                            </div>
                        </div>
                    ))}
                    
                </div>

            </section>


        </main>


    </div>
  </>)
}

export default Residence_Info