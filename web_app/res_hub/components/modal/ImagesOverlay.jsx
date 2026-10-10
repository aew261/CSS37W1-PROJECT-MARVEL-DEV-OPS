import { FaArrowLeft,FaArrowRight   } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { setModalState } from "../../redux/modal";

import image from '../../src/assets/images/Bolitha.jpeg'

import imagesSt from '../../styles/modal/images_overlay.module.css'
import { useEffect, useState } from "react";

function ImagesOverlay({setShowModal, images}) {
    const [preview, setPreview]=useState([])
    const [index,setIndex]=useState(0)
    useEffect(() => {
        if (images) {
            setPreview([
                images.cover_url,
                ...(images.additional_photos || [])
            ]);
        }
        console.log(preview)
    }, [images]);

    

   const handleNext=()=>{
        setIndex((prev)=>(prev + 1)%preview?.length)
   }

   const handlePrev=()=>{
        setIndex((prev)=> (prev - 1 + preview.length) % preview.length)
   }
  return (<>
    <div className={imagesSt.container}  >

        <section className={imagesSt.navigators}  >
            <button onClick={handlePrev}  >
                <FaArrowLeft  className={imagesSt.icon}  />
            </button>
        </section>


        <section className={imagesSt.image_section}  >

            <button onClick={()=>setShowModal(false)}  >
                <MdCancel className={imagesSt.cancel_icon} />
            </button>

            <div className={imagesSt.images_wrapper}  >
                <img src={`${preview[index]}`}  />
            </div>

            <div className={imagesSt.indicators_section}  >
                
                
                {Array(preview?.length).fill(null).map((_, ind) => (
                    <div
                        key={ind}
                        className={`${imagesSt.indicator} ${
                            ind === index ? imagesSt.active : ""
                        }`}
                        
                    >
                    </div>
                ))}
                    
                
            </div>

        </section>


        <section className={imagesSt.navigators}  >
            <button   onClick={handleNext}>
                <FaArrowRight className={imagesSt.icon}   />
            </button>
        </section>

    </div>
  </>)
}

export default ImagesOverlay