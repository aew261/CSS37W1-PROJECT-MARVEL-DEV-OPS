import { useAuth } from '../../authentication/AuthProvider';
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_MB = 5;
const MAX_EXTRA_PHOTOS = 10;
const MAX_DESCRIPTION = 1000;

const AMENITIES = [
  'Wi-Fi',
  'Laundry',
  'Security / CCTV',
  'Parking',
  'Furnished',
  'Study area',
  'Backup power',
  'Water tank',
  'Shared kitchen',
];

const INITIAL_VALUES = {
  name: '',
  address: '',
  suburb: '',
  city: '',
  distanceKm: '',
  rooms: '',
  landlordName: '',
  landlordPhone: '',
  description: '',
  status: 'Under Review',
  amenities: [],
};

// Set VITE_MOCK_UPLOAD=true in .env to test the form without a backend.
const USE_MOCK = import.meta.env.VITE_MOCK_UPLOAD === 'true';

import { FaImage, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import useUploadResidences from '../../hooks/validation/uploadResidences';
import styles from '../../styles/components/upload_residence.module.css';

function UploadResidence() {

    const {handleChange,uploadData}=useUploadResidences()
    const [images,setImages]=useState({
        cover_url:null,
        additional:[]
    })
    useEffect(()=>{
        if(uploadData){
            //console.log(uploadData)
        }

        console.log(images)
    },[images])

    useEffect(()=>{
        if(images){
            handleChange("res_images", images)
        }
        
    },[images])
    const handleAmnesties=(e)=>{
        const {value,checked}=e.target

    }

    const onImageUpload=(e)=>{
        const file=e.target.files[0]
        if(!file) return;

        
        const previewUrl = URL.createObjectURL(file);
        
        if (!images.cover_url) {
            setImages((prev) => ({...prev,
                cover_url: {
                    file: file,
                    preview_url: previewUrl
                }
            }));
        } else {
                setImages((prev) => ({...prev,
                    additional: [...prev.additional,
                        {
                            file: file,
                            preview_url: previewUrl
                        }
                    ] }
                ));
        }

        //onsole.log(images)

        //
          
    }
    return (
        <div className={styles.container}>

            {/* Page Header */}
            <div className={styles.pageHeader}>
                <h1>Upload Residence</h1>
                <p>
                    Add a new off-campus residence so students can
                    read and write reviews about it.
                </p>
            </div>


            {/* ================= BASIC INFORMATION ================= */}
            <section className={styles.card}>
                <h2>Basic information</h2>

                <label className={styles.field}>
                    <span>Residence name *</span>
                    <input
                        type="text"
                        placeholder="e.g. Bolitha Residence"
                        onChange={(e)=>handleChange("res_name",e.target.value)}
                    />
                </label>


            </section>


            {/* ================= PHOTOS ================= */}
            <section className={styles.card}>
                <h2>Photos</h2>

                {/* Cover Photo */}
                <div className={styles.field}>
                    <span>Primary cover photo *</span>

                    <p className={styles.hint}>
                        Shown on the residence card. JPG, PNG or WEBP, up to 5 MB.
                    </p>

                    <div className={styles.coverPreview}>
                        <img
                            src={`${images?.cover_url?.preview_url}`}
                            alt="Residence cover"
                        />

                        <button
                            type="button"
                            className={styles.removeBtn}
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>


                {/* Additional Photos */}
                <div className={styles.field}>
                    <span>
                        Additional photos (3/10)
                    </span>

                    <p className={styles.hint}>
                        Rooms, kitchen, bathrooms, outside area, etc.
                    </p>

                    <ul className={styles.thumbGrid}>
                        {images.additional.map((item)=>(
                            <li className={styles.thumb}>
                            <img
                                src={`${item?.preview_url}`}
                                alt="Residence room"
                            />

                            <button
                                type="button"
                                className={styles.removeBtn}
                            >
                                <FaTimes />
                            </button>
                        </li>
                        ))}
                        

                    </ul>


                    {/* Add photos */}
                    <label className={styles.dropzone}>
                        <FaImage />

                        <strong>
                            Add more photos
                        </strong>

                        <span>
                            Click to select photos
                        </span>

                        <input
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp"
                            className={styles.fileInput}
                            onChange={onImageUpload}
                        />
                    </label>
                </div>

            </section>


            {/* ================= KEY DETAILS ================= */}
            <section className={styles.card}>
                <h2>Key details</h2>

                <label className={styles.field}>
                    <span>Street address *</span>

                    <input
                        type="text"
                        placeholder="e.g. 10 Kingfisher Street"
                        onChange={(e)=>handleChange("address",e.target.value)}
                    />
                </label>


                <div className={styles.row}>

                    <label className={styles.field}>
                        <span>Suburb</span>

                        <input
                            type="text"
                            placeholder="e.g. Southernwood"
                            onChange={(e)=>handleChange("suburb",e.target.value)}
                        />
                    </label>


                    <label className={styles.field}>
                        <span>City / Town</span>

                        <input
                            type="text"
                            placeholder="e.g. Mthatha"
                            onChange={(e)=>handleChange("city",e.target.value)}
                        />
                    </label>

                </div>


                


                {/* Amenities */}
                <fieldset className={styles.amenities}>
                    <legend>Amenities</legend>

                    <div className={styles.amenityGrid}>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox" 
                                onClick={handleAmnesties}
                            />
                            <span>Wi-Fi</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox"
                                onClick={handleAmnesties}
                            />
                            <span>Laundry</span>
                            
                        </label>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox"
                                onClick={handleAmnesties}
                           />
                            <span>Security / CCTV</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox" 
                                onClick={handleAmnesties}
                            />
                            <span>Parking</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox"
                                onClick={handleAmnesties}
                             />
                            <span>Furnished</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox" 
                                onClick={handleAmnesties}
                            />
                            <span>Study area</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox"
                                onClick={handleAmnesties}
                             />
                            <span>Backup power</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox" 
                                onClick={handleAmnesties}
                            />
                            <span>Water tank</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input 
                                type="checkbox" 
                                onClick={handleAmnesties}
                            />
                            <span>Shared kitchen</span>
                        </label>

                    </div>
                </fieldset>

            </section>


            {/* ================= ACTIONS ================= */}
            <div className={styles.actions}>

                <button
                    type="button"
                    className={styles.secondaryBtn}
                >
                    Clear form
                </button>

                <button
                    type="button"
                    className={styles.primaryBtn}
                >
                    Upload Residence
                </button>

            </div>

        </div>
    );
}

export default UploadResidence;