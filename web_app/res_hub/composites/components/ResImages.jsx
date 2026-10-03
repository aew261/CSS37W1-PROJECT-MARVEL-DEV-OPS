import imageSt from '../../styles/composites/res_images.module.css'
import { BsImages } from "react-icons/bs";

import image from '../../src/assets/images/Bolitha.jpeg'
function ResImages() {
  return (<>
    <div className={imageSt.container}  >
        {/*<div className={imageSt.image_count_wrapper}  >
              <p>+5</p>
        </div>*/}
        <div className={imageSt.image_wrapper}  >
            {/*<img src={image} alt="Bolitha" />*/}
            <div   className={imageSt.empty_images} >
                <BsImages className={imageSt.empty_images_icon} />
                <p>No Images</p>
            </div>
        </div>
    </div>
  </>)
}

export default ResImages;