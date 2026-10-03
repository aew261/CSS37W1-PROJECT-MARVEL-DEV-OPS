
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
import styles from '../../styles/components/upload_residence.module.css';

function UploadResidence() {
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
                    />
                </label>

                <label className={styles.field}>
                    <span>Description *</span>

                    <textarea
                        rows={5}
                        placeholder="Describe the residence, building, surroundings, and what students should know..."
                    />

                    <small className={styles.counter}>
                        0/1000
                    </small>
                </label>

                <label className={styles.field}>
                    <span>Listing status</span>

                    <select defaultValue="Under Review">
                        <option>Under Review</option>
                        <option>Verified</option>
                    </select>
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
                            src="https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800"
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

                        <li className={styles.thumb}>
                            <img
                                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"
                                alt="Residence room"
                            />

                            <button
                                type="button"
                                className={styles.removeBtn}
                            >
                                <FaTimes />
                            </button>
                        </li>

                        <li className={styles.thumb}>
                            <img
                                src="https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=500"
                                alt="Residence kitchen"
                            />

                            <button
                                type="button"
                                className={styles.removeBtn}
                            >
                                <FaTimes />
                            </button>
                        </li>

                        <li className={styles.thumb}>
                            <img
                                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500"
                                alt="Residence bathroom"
                            />

                            <button
                                type="button"
                                className={styles.removeBtn}
                            >
                                <FaTimes />
                            </button>
                        </li>

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
                    />
                </label>


                <div className={styles.row}>

                    <label className={styles.field}>
                        <span>Suburb</span>

                        <input
                            type="text"
                            placeholder="e.g. Southernwood"
                        />
                    </label>


                    <label className={styles.field}>
                        <span>City / Town</span>

                        <input
                            type="text"
                            placeholder="e.g. Mthatha"
                        />
                    </label>

                </div>


                <div className={styles.row}>

                    <label className={styles.field}>
                        <span>Distance from campus (km)</span>

                        <input
                            type="number"
                            placeholder="e.g. 2.5"
                        />
                    </label>


                    <label className={styles.field}>
                        <span>Number of rooms</span>

                        <input
                            type="number"
                            placeholder="e.g. 12"
                        />
                    </label>

                </div>


                <div className={styles.row}>

                    <label className={styles.field}>
                        <span>Landlord / contact person</span>

                        <input
                            type="text"
                            placeholder="e.g. Mr. Dlamini"
                        />
                    </label>


                    <label className={styles.field}>
                        <span>Landlord contact number</span>

                        <input
                            type="tel"
                            placeholder="e.g. 082 123 4567"
                        />
                    </label>

                </div>


                {/* Amenities */}
                <fieldset className={styles.amenities}>
                    <legend>Amenities</legend>

                    <div className={styles.amenityGrid}>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Wi-Fi</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Laundry</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Security / CCTV</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Parking</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Furnished</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Study area</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Backup power</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span>Water tank</span>
                        </label>

                        <label className={styles.checkbox}>
                            <input type="checkbox" />
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