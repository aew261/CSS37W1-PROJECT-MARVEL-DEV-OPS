
import { FaImage, FaTimes } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import { useUploadResidenceMutation } from '../../api/app_api';
import Toast from '../common/Toast';

import useUploadResidences from '../../hooks/validation/uploadResidences';
import styles from '../../styles/components/upload_residence.module.css';

function UploadResidence() {
    const {
        handleChange,
        uploadData,
        uploadErrors,
        validateForm,
        resetForm
    } = useUploadResidences();

    const [amneties, setAmneties] = useState([]);

    const [toast, setToast] = useState(null);

    const [images, setImages] = useState({
        cover_url: null,
        additional: []
    });

    const residenceNameRef = useRef(null);
    const addressRef = useRef(null);
    const suburbRef = useRef(null);
    const cityRef = useRef(null);
    const fileInputRef = useRef(null);

    const [handleUpload, { isLoading }] =
        useUploadResidenceMutation();

    useEffect(() => {
        if (uploadData) {
            console.log(uploadData);
        }
    }, [uploadData]);

    useEffect(() => {
        handleChange('res_images', images);
        handleChange('Amneties', amneties);
    }, [images, amneties]);

    const handleAmnesties = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setAmneties((prev) => [...prev, value]);
        } else {
            setAmneties((prev) =>
                prev.filter((amenity) => amenity !== value)
            );
        }
    };

    const onImageUpload = (e) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) return;

        const validFiles = files.filter((file) => {
            const validType = [
                'image/jpeg',
                'image/png',
                'image/webp'
            ].includes(file.type);

            const validSize = file.size <= 5 * 1024 * 1024;

            return validType && validSize;
        });

        if (validFiles.length !== files.length) {
            setToast({
                title: 'Invalid image',
                content:
                    'Only JPG, PNG or WEBP images up to 5 MB each are allowed.',
                type: 'error'
            });
        }

        setImages((prev) => {
            let cover = prev.cover_url;
            let additional = [...prev.additional];

            validFiles.forEach((file) => {
                const image = {
                    file,
                    preview_url: URL.createObjectURL(file)
                };

                if (!cover) {
                    cover = image;
                } else if (additional.length < 9) {
                    additional.push(image);
                }
            });

            return {
                cover_url: cover,
                additional
            };
        });

        // Allow the same file to be selected again.
        e.target.value = '';
    };

    const removeCoverImage = () => {
        setImages((prev) => {
            if (prev.cover_url?.preview_url) {
                URL.revokeObjectURL(prev.cover_url.preview_url);
            }

            return {
                ...prev,
                cover_url: null
            };
        });
    };

    const removeAdditionalImage = (index) => {
        setImages((prev) => {
            const image = prev.additional[index];

            if (image?.preview_url) {
                URL.revokeObjectURL(image.preview_url);
            }

            return {
                ...prev,
                additional: prev.additional.filter(
                    (_, i) => i !== index
                )
            };
        });
    };

    const clearForm = () => {
        images.cover_url &&
            URL.revokeObjectURL(images.cover_url.preview_url);

        images.additional.forEach((image) => {
            URL.revokeObjectURL(image.preview_url);
        });

        resetForm();

        setImages({
            cover_url: null,
            additional: []
        });

        setAmneties([]);
        setToast(null);

        if (residenceNameRef.current) {
            residenceNameRef.current.value = '';
        }

        if (addressRef.current) {
            addressRef.current.value = '';
        }

        if (suburbRef.current) {
            suburbRef.current.value = '';
        }

        if (cityRef.current) {
            cityRef.current.value = '';
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async () => {
        if (isLoading) return;

        setToast(null);

        const { updatedData, isValid } = validateForm();

        if (!isValid) {
            setToast({
                title: 'Check your details',
                content:
                    'Please correct the required fields before uploading.',
                type: 'error'
            });

            return;
        }

        if (!updatedData.res_photos?.cover_url?.file) {
            setToast({
                title: 'Cover photo required',
                content: 'Please select a primary cover photo.',
                type: 'error'
            });

            return;
        }

        const formData = new FormData();

        formData.append('res_name', updatedData.res_name);
        formData.append('address', updatedData.address);
        formData.append('suburb', updatedData.suburb || '');
        formData.append('city', updatedData.city);
        formData.append('amneties', JSON.stringify(amneties));

        formData.append(
            'cover',
            updatedData.res_photos.cover_url.file
        );

        updatedData.res_photos.additional.forEach((item) => {
            formData.append('additional', item.file);
        });

        try {
            const results = await handleUpload(formData).unwrap();

            if (!results?.success) {
                throw new Error(
                    results?.message ||
                    'The residence could not be uploaded.'
                );
            }

            clearForm();

            setToast({
                title: 'Upload successful',
                content: 'The residence has been added successfully.',
                type: 'success'
            });
        } catch (err) {
            console.error('Residence upload failed:', err);

            setToast({
                title: 'Upload failed',
                content:
                    err?.data?.error?.message ||
                    err?.data?.message ||
                    err?.message ||
                    'Unable to upload the residence. Please try again.',
                type: 'error'
            });
        }
    };

    return (
        <div className={styles.container}>
            {toast && (
                <Toast
                    title={toast.title}
                    content={toast.content}
                    type={toast.type}
                />
            )}

            <div className={styles.pageHeader}>
                <h1>Upload Residence</h1>
                <p>
                    Add a new off-campus residence so students can
                    read and write reviews about it.
                </p>
            </div>

            {/* BASIC INFORMATION */}
            <section className={styles.card}>
                <h2>Basic information</h2>

                <label className={styles.field}>
                    <span>Residence name *</span>
                    <input
                        ref={residenceNameRef}
                        type="text"
                        placeholder="e.g. Bolitha Residence"
                        onChange={(e) =>
                            handleChange('res_name', e.target.value)
                        }
                    />
                </label>

                {uploadErrors.res_name && (
                    <ul>
                        <li>{uploadErrors.res_name}</li>
                    </ul>
                )}
            </section>

            {/* PHOTOS */}
            <section className={styles.card}>
                <h2>Photos</h2>

                <div className={styles.field}>
                    <span>Primary cover photo *</span>

                    <p className={styles.hint}>
                        Shown on the residence card. JPG, PNG or WEBP,
                        up to 5 MB.
                    </p>

                    {images.cover_url && (
                        <div className={styles.coverPreview}>
                            <img
                                src={images.cover_url.preview_url}
                                alt="Residence cover"
                            />

                            <button
                                type="button"
                                className={styles.removeBtn}
                                onClick={removeCoverImage}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.field}>
                    <span>
                        Additional photos ({images.additional.length}/9)
                    </span>

                    <p className={styles.hint}>
                        Rooms, kitchen, bathrooms, outside area, etc.
                    </p>

                    <ul className={styles.thumbGrid}>
                        {images.additional.map((item, index) => (
                            <li
                                className={styles.thumb}
                                key={item.preview_url}
                            >
                                <img
                                    src={item.preview_url}
                                    alt="Residence room"
                                />

                                <button
                                    type="button"
                                    className={styles.removeBtn}
                                    onClick={() =>
                                        removeAdditionalImage(index)
                                    }
                                >
                                    <FaTimes />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <label className={styles.dropzone}>
                        <FaImage />

                        <strong>Add more photos</strong>

                        <span>Click to select photos</span>

                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/webp"
                            className={styles.fileInput}
                            onChange={onImageUpload}
                        />
                    </label>
                </div>
            </section>

            {/* KEY DETAILS */}
            <section className={styles.card}>
                <h2>Key details</h2>

                <label className={styles.field}>
                    <span>Street address *</span>

                    <input
                        ref={addressRef}
                        type="text"
                        placeholder="e.g. 10 Kingfisher Street"
                        onChange={(e) =>
                            handleChange('address', e.target.value)
                        }
                    />

                    {uploadErrors.address && (
                        <ul>
                            <li>{uploadErrors.address}</li>
                        </ul>
                    )}
                </label>

                <div className={styles.row}>
                    <label className={styles.field}>
                        <span>Suburb</span>

                        <input
                            ref={suburbRef}
                            type="text"
                            placeholder="e.g. Southernwood"
                            onChange={(e) =>
                                handleChange('suburb', e.target.value)
                            }
                        />
                    </label>

                    <label className={styles.field}>
                        <span>City / Town *</span>

                        <input
                            ref={cityRef}
                            type="text"
                            placeholder="e.g. Mthatha"
                            onChange={(e) =>
                                handleChange('city', e.target.value)
                            }
                        />

                        {uploadErrors.city && (
                            <ul>
                                <li>{uploadErrors.city}</li>
                            </ul>
                        )}
                    </label>
                </div>

                {/* AMENITIES */}
                <fieldset className={styles.amenities}>
                    <legend>Amenities</legend>

                    <div className={styles.amenityGrid}>
                        {[
                            'Wi-Fi',
                            'Laundry',
                            'Security / CCTV',
                            'Parking',
                            'Furnished',
                            'Study area',
                            'Backup power',
                            'Water tank',
                            'Shared kitchen'
                        ].map((amenity) => (
                            <label
                                className={styles.checkbox}
                                key={amenity}
                            >
                                <input
                                    type="checkbox"
                                    checked={amneties.includes(amenity)}
                                    onChange={handleAmnesties}
                                    value={amenity}
                                />

                                <span>{amenity}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {uploadErrors.Amneties && (
                    <ul>
                        <li>{uploadErrors.Amneties}</li>
                    </ul>
                )}
            </section>

            {/* ACTIONS */}
            <div className={styles.actions}>
                <button
                    onClick={clearForm}
                    type="button"
                    className={styles.secondaryBtn}
                    disabled={isLoading}
                >
                    Clear form
                </button>

                <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    aria-busy={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className={styles.loadingSpinner} />
                            Uploading residence...
                        </>
                    ) : (
                        'Upload Residence'
                    )}
                </button>
            </div>
        </div>
    );
}

export default UploadResidence;