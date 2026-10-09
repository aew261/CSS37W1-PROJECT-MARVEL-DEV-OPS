import { FaArrowLeft,FaArrowRight   } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { setModalState } from "../../redux/modal";

import image from '../../src/assets/images/Bolitha.jpeg'

import imagesSt from '../../styles/modal/images_overlay.module.css'

function ImagesOverlay({setShowModal}) {
    
  return (<>
    <div className={imagesSt.container}  >

        <section className={imagesSt.navigators}  >
            <button   >
                <FaArrowLeft  className={imagesSt.icon}  />
            </button>
        </section>


        <section className={imagesSt.image_section}  >

            <button onClick={()=>setShowModal(false)}  >
                <MdCancel className={imagesSt.cancel_icon} />
            </button>

            <div className={imagesSt.images_wrapper}  >
                <img src={image}  />
            </div>

            <div className={imagesSt.indicators_section}  >
                
                
                {Array(5).fill(null).map((_, index) => (
                    <div
                        key={index}
                        className={imagesSt.indicator}
                    >
                    </div>
                ))}
                    
                
            </div>

        </section>


        <section className={imagesSt.navigators}  >
            <button>
                <FaArrowRight className={imagesSt.icon}   />
            </button>
        </section>

    </div>
  </>)
}

export default ImagesOverlay