import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaImage, FaTimes } from 'react-icons/fa';
import { useCreateResidenceMutation } from '../../api/app_api';
import styles from '../../styles/components/upload_residence.module.css';

// ---- Rules (ResHub is a review platform: there is deliberately NO price/rent field,
//      because NSFAS pays for student accommodation) ----
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

const checkImage = (file) => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `"${file.name}" is not a JPG, PNG or WEBP image.`;
  }
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
    return `"${file.name}" is larger than ${MAX_IMAGE_MB} MB.`;
  }
  return null;
};

const validate = (values, cover) => {
  const errors = {};
  const phone = values.landlordPhone.replace(/[\s-]/g, '');

  if (!values.name.trim()) errors.name = 'Residence name is required';
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  else if (values.name.trim().length > 100) errors.name = 'Name must be 100 characters or less';

  if (!values.address.trim()) errors.address = 'Street address is required';

  if (!values.description.trim()) errors.description = 'Please add a short description';
  else if (values.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  if (values.distanceKm !== '' && !(Number(values.distanceKm) >= 0)) {
    errors.distanceKm = 'Enter a distance of 0 km or more';
  }

  if (values.rooms !== '' && !(Number.isInteger(Number(values.rooms)) && Number(values.rooms) >= 1)) {
    errors.rooms = 'Enter a whole number of 1 or more';
  }

  if (phone && !/^(\+27|0)[0-9]{9}$/.test(phone)) {
    errors.landlordPhone = 'Use a South African number, e.g. 0821234567 or +27821234567';
  }

  if (!cover) errors.cover = 'A cover photo is required';

  return errors;
};

const getErrorMessage = (error) => {
  if (error?.status === 'FETCH_ERROR') {
    return 'Cannot reach the server. Check that the backend is running and try again.';
  }
  if (error?.status === 401 || error?.status === 403) {
    return 'You do not have permission to upload residences.';
  }
  return error?.data?.message ?? 'Upload failed. Please try again.';
};

function UploadResidence() {
  const [createResidence, { isLoading }] = useCreateResidenceMutation();

  const [values, setValues] = useState(INITIAL_VALUES);
  const [cover, setCover] = useState(null);   // { file, url }
  const [photos, setPhotos] = useState([]);   // [{ id, file, url }]
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');
  const [mockSubmitting, setMockSubmitting] = useState(false);

  const busy = isLoading || mockSubmitting;

  // ---------- text / select fields ----------
  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSuccess('');
  };

  const toggleAmenity = (amenity) => {
    setValues((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // ---------- cover photo ----------
  const handleCoverChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // lets the same file be picked again later
    if (!file) return;

    const problem = checkImage(file);
    if (problem) {
      setErrors((prev) => ({ ...prev, cover: problem }));
      return;
    }

    if (cover) URL.revokeObjectURL(cover.url);
    setCover({ file, url: URL.createObjectURL(file) });
    setErrors((prev) => ({ ...prev, cover: undefined }));
    setSuccess('');
  };

  const removeCover = () => {
    if (cover) URL.revokeObjectURL(cover.url);
    setCover(null);
  };

  // ---------- additional photos ----------
  const handlePhotosChange = (e) => {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (picked.length === 0) return;

    const accepted = [];
    const problems = [];
    const room = MAX_EXTRA_PHOTOS - photos.length;

    picked.forEach((file) => {
      const problem = checkImage(file);
      const duplicate = [...photos, ...accepted].some(
        (p) =>
          p.file.name === file.name &&
          p.file.size === file.size &&
          p.file.lastModified === file.lastModified
      );

      if (problem) problems.push(problem);
      else if (duplicate) problems.push(`"${file.name}" was already added.`);
      else if (accepted.length >= room) {
        if (!problems.some((p) => p.startsWith('You can add'))) {
          problems.push(`You can add up to ${MAX_EXTRA_PHOTOS} additional photos.`);
        }
      } else {
        accepted.push({
          id: `${file.name}-${file.size}-${file.lastModified}`,
          file,
          url: URL.createObjectURL(file),
        });
      }
    });

    if (accepted.length) setPhotos((prev) => [...prev, ...accepted]);
    setErrors((prev) => ({ ...prev, photos: problems[0] }));
    setSuccess('');
  };

  const removePhoto = (id) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
    setErrors((prev) => ({ ...prev, photos: undefined }));
  };

  // ---------- reset ----------
  const resetForm = () => {
    if (cover) URL.revokeObjectURL(cover.url);
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setValues(INITIAL_VALUES);
    setCover(null);
    setPhotos([]);
    setErrors({});
    setSubmitError('');
  };

  // ---------- submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccess('');

    const found = validate(values, cover);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const body = new FormData();
    body.append('name', values.name.trim());
    body.append('address', values.address.trim());
    body.append('suburb', values.suburb.trim());
    body.append('city', values.city.trim());
    body.append('distance_km', values.distanceKm);
    body.append('rooms', values.rooms);
    body.append('landlord_name', values.landlordName.trim());
    body.append('landlord_phone', values.landlordPhone.replace(/[\s-]/g, ''));
    body.append('description', values.description.trim());
    body.append('status', values.status);
    body.append('amenities', JSON.stringify(values.amenities));
    body.append('cover_photo', cover.file);
    photos.forEach((p) => body.append('photos', p.file));

    const savedName = values.name.trim();

    if (USE_MOCK) {
      setMockSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('[mock upload] fields:', Object.fromEntries(body.entries()));
      setMockSubmitting(false);
    } else {
      const result = await createResidence(body);
      if (result.error) {
        setSubmitError(getErrorMessage(result.error));
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    resetForm();
    setSuccess(`"${savedName}" was uploaded successfully.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fieldClass = (name) => `${styles.field} ${errors[name] ? styles.fieldInvalid : ''}`;

  return (
    <div className={styles.container}>

      <div className={styles.pageHeader}>
        <h1>Upload Residence</h1>
        <p>Add a new off-campus residence so students can read and write reviews about it.</p>
      </div>

      {success && (
        <div className={styles.successBanner} role="status">
          <span>{success}</span>
          <Link to="/admin">Back to analytics</Link>
        </div>
      )}
      {submitError && (
        <div className={styles.errorBanner} role="alert">{submitError}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* ===== 1. Basic information ===== */}
        <section className={styles.card}>
          <h2>Basic information</h2>

          <label className={fieldClass('name')}>
            <span>Residence name *</span>
            <input
              type="text"
              value={values.name}
              onChange={handleChange('name')}
              placeholder="e.g. Bolitha Residence"
              maxLength={100}
            />
            {errors.name && <em className={styles.error}>{errors.name}</em>}
          </label>

          <label className={fieldClass('description')}>
            <span>Description *</span>
            <textarea
              rows={5}
              value={values.description}
              onChange={handleChange('description')}
              placeholder="Describe the residence: the building, surroundings, what students should know..."
              maxLength={MAX_DESCRIPTION}
            />
            <small className={styles.counter}>
              {values.description.length}/{MAX_DESCRIPTION}
            </small>
            {errors.description && <em className={styles.error}>{errors.description}</em>}
          </label>

          <label className={styles.field}>
            <span>Listing status</span>
            <select value={values.status} onChange={handleChange('status')}>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
            </select>
          </label>
        </section>

        {/* ===== 2. Photos ===== */}
        <section className={styles.card}>
          <h2>Photos</h2>

          {/* Cover photo */}
          <div className={`${styles.field} ${errors.cover ? styles.fieldInvalid : ''}`}>
            <span>Primary cover photo *</span>
            <p className={styles.hint}>
              Shown on the residence card. JPG, PNG or WEBP, up to {MAX_IMAGE_MB} MB.
            </p>

            {cover ? (
              <div className={styles.coverPreview}>
                <img src={cover.url} alt="Cover preview" />
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={removeCover}
                  aria-label="Remove cover photo"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className={styles.dropzone}>
                <FaImage aria-hidden="true" />
                <strong>Choose cover photo</strong>
                <input
                  type="file"
                  accept={ALLOWED_TYPES.join(',')}
                  onChange={handleCoverChange}
                  className={styles.fileInput}
                />
              </label>
            )}
            {errors.cover && <em className={styles.error}>{errors.cover}</em>}
          </div>

          {/* Additional photos */}
          <div className={`${styles.field} ${errors.photos ? styles.fieldInvalid : ''}`}>
            <span>
              Additional photos ({photos.length}/{MAX_EXTRA_PHOTOS})
            </span>
            <p className={styles.hint}>Rooms, kitchen, bathrooms, outside area, etc.</p>

            {photos.length > 0 && (
              <ul className={styles.thumbGrid}>
                {photos.map((p) => (
                  <li key={p.id} className={styles.thumb}>
                    <img src={p.url} alt={p.file.name} />
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => removePhoto(p.id)}
                      aria-label={`Remove ${p.file.name}`}
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {photos.length < MAX_EXTRA_PHOTOS && (
              <label className={styles.dropzone}>
                <FaImage aria-hidden="true" />
                <strong>Add more photos</strong>
                <input
                  type="file"
                  accept={ALLOWED_TYPES.join(',')}
                  multiple
                  onChange={handlePhotosChange}
                  className={styles.fileInput}
                />
              </label>
            )}
            {errors.photos && <em className={styles.error}>{errors.photos}</em>}
          </div>
        </section>

        {/* ===== 3. Key details ===== */}
        <section className={styles.card}>
          <h2>Key details</h2>

          <label className={fieldClass('address')}>
            <span>Street address *</span>
            <input
              type="text"
              value={values.address}
              onChange={handleChange('address')}
              placeholder="e.g. 10 Kingfisher Street"
            />
            {errors.address && <em className={styles.error}>{errors.address}</em>}
          </label>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Suburb</span>
              <input
                type="text"
                value={values.suburb}
                onChange={handleChange('suburb')}
                placeholder="e.g. Southernwood"
              />
            </label>

            <label className={styles.field}>
              <span>City / Town</span>
              <input
                type="text"
                value={values.city}
                onChange={handleChange('city')}
                placeholder="e.g. Mthatha"
              />
            </label>
          </div>

          <div className={styles.row}>
            <label className={fieldClass('distanceKm')}>
              <span>Distance from campus (km)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={values.distanceKm}
                onChange={handleChange('distanceKm')}
                placeholder="e.g. 2.5"
              />
              {errors.distanceKm && <em className={styles.error}>{errors.distanceKm}</em>}
            </label>

            <label className={fieldClass('rooms')}>
              <span>Number of rooms</span>
              <input
                type="number"
                min="1"
                step="1"
                value={values.rooms}
                onChange={handleChange('rooms')}
                placeholder="e.g. 12"
              />
              {errors.rooms && <em className={styles.error}>{errors.rooms}</em>}
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Landlord / contact person</span>
              <input
                type="text"
                value={values.landlordName}
                onChange={handleChange('landlordName')}
                placeholder="e.g. Mr. Dlamini"
              />
            </label>

            <label className={fieldClass('landlordPhone')}>
              <span>Landlord contact number</span>
              <input
                type="tel"
                value={values.landlordPhone}
                onChange={handleChange('landlordPhone')}
                placeholder="e.g. 082 123 4567"
              />
              {errors.landlordPhone && <em className={styles.error}>{errors.landlordPhone}</em>}
            </label>
          </div>

          <fieldset className={styles.amenities}>
            <legend>Amenities</legend>
            <div className={styles.amenityGrid}>
              {AMENITIES.map((amenity) => (
                <label key={amenity} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={values.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {/* ===== Actions ===== */}
        <div className={styles.actions}>
          <button type="button" className={styles.secondaryBtn} onClick={resetForm} disabled={busy}>
            Clear form
          </button>
          <button type="submit" className={styles.primaryBtn} disabled={busy}>
            {busy ? 'Uploading...' : 'Upload Residence'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default UploadResidence;