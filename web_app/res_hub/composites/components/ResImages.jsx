import imageSt from '../../styles/composites/res_images.module.css'
import { BsImages } from "react-icons/bs";

import image from '../../src/assets/images/Bolitha.jpeg'
function ResImages({images}) {
  return (<>
    <div className={imageSt.container}  >
        {images?.additional_photos.length > 0 && (
          <div className={imageSt.image_count_wrapper}  >
              <p> +{images?.additional_photos.length}</p>
          </div> )}
        <div className={imageSt.image_wrapper}  >
            {images?.cover_url ? <img src={images?.cover_url} alt="Bolitha" />
                :(<div   className={imageSt.empty_images} >
                    <BsImages className={imageSt.empty_images_icon} />
                    <p>No Images</p>
                  </div>)
            }
            
            
        </div>
    </div>
  </>)
}

export default ResImages;