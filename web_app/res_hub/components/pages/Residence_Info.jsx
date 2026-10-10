import { FaStar, FaLocationDot,  } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetchResInfoQuery } from "../../api/app_api";


import ResImages from "../../composites/components/ResImages";
import residenceSt from '../../styles/components/residence_info.module.css'
import ImagesOverlay from "../modal/ImagesOverlay";

function Residence_Info() {
    const navigate=useNavigate()

    const [showModal,setShowModal]=useState(false)

    const { state } = useLocation();
    const res_id = state?.id;

    

   const {data,error,isLoading}=useFetchResInfoQuery(res_id);
   useEffect(()=>{
    if(data){
        console.log(data) 
    }
       
    },[])

    useEffect(()=>{
        console.log("info: ", res_id)
    })

   
    


  return (<>
    <div className={residenceSt.container}  >
        {showModal && <ImagesOverlay setShowModal={setShowModal}   />}
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
                            <FaStar key={ind} className={residenceSt.rating_icon} />
                        ))}
                    </div>

                    <p>{data?.data?.overall_rating}  (15 reviews)</p>
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
                                <FaStar key={ind} className={residenceSt.rating_icon} />
                            ))}
                        </div>

                        <div  className={residenceSt.category}  >
                            <p>Infrastructure</p>
                            {[...Array(5)].map((_,ind)=>(
                                <FaStar key={ind} className={residenceSt.rating_icon} />
                            ))}
                        </div>

                        <div  className={residenceSt.category}  >
                            <p>Service</p>
                            {[...Array(5)].map((_,ind)=>(
                                <FaStar key={ind} className={residenceSt.rating_icon} />
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

                    <div className={residenceSt.review_card}   >
                        <div className={residenceSt.review_info}  >
                            <p>Thabo M</p>
                            <p>2021/02/07</p>
                        </div>
                        <div className={residenceSt.review_content}   >
                           <p>Hey i stayed here last year. </p> 

                           <button   >
                                <p>Helpful (3)</p>
                           </button>

                        </div>
                    </div>

                    <div className={residenceSt.review_card}   >
                        <div className={residenceSt.review_info}  >
                            <p>Thabo M</p>
                            <p>2021/02/07</p>
                        </div>
                        <div className={residenceSt.review_content}   >
                           <p>Hey i stayed here last year. </p> 

                           <button   >
                                <p>Helpful (3)</p>
                           </button>

                        </div>
                    </div>


                </div>

            </section>


        </main>


    </div>
  </>)
}

export default Residence_Info