import { useState } from "react";

function useUploadResidences() {
    const [uploadData, setUploadData] = useState({
        res_name: "",
        res_photos: {
            cover_url: "",
            additional: []
        },
        address: "",
        suburb: "",
        city: "",
        Amneties: []
    });

    const [uploadErrors, setUploadErrors] = useState({});

    const validateField = (name, value) => {
        let error = null;

        if (name === "res_name") {
            if (!value?.trim()) {
                error = "Residence name is required";
            }
        }

        if (name === "cover_url") {
            if (!value?.trim()) {
                error = "Cover photo is required";
            }
        }

        

        if (name === "address") {
            if (!value?.trim()) {
                error = "Address is required";
            }
        }

        if (name === "suburb") {
            if (!value?.trim()) {
                error = "Suburb is required";
            }
        }

        if (name === "city") {
            if (!value?.trim()) {
                error = "City is required";
            }
        }

        if (name === "Amneties") {
            if (!Array.isArray(value) || value.length === 0) {
                error = "At least one amenity is required";
            }
        }

        return error;
    };

    const handleChange = (name, value) => {
        if (name === "res_images") {
            setUploadData((prev) => ({
                ...prev,
                res_photos: value
            }));
        }else {
            setUploadData((prev) => ({
                ...prev,
                [name]: value
            }));
        }

        const error = validateField(name, value);

        setUploadErrors((prev) => ({
            ...prev, [name]: error
        }));
    };

    const validateForm = () => {
        const errors = {};

        const fields = {
            res_name: uploadData.res_name,
            cover_url: uploadData.res_photos.cover_url,
            additional: uploadData.res_photos.additional,
            address: uploadData.address,
            suburb: uploadData.suburb,
            city: uploadData.city,
            Amneties: uploadData.Amneties
        };

        Object.keys(fields).forEach((field) => {
            const error = validateField(field, fields[field]);

            if (error) {
                errors[field] = error;
            }
        });

        setUploadErrors(errors);

        const isValid = Object.keys(errors).length === 0;

        return {
            isValid,
            updatedData: uploadData
        };
    };

    const hasErrors = Object.values(uploadErrors).some(
        (error) => error != null
    );

    const requiredFieldsFilled =
        uploadData.res_name.trim() &&
        uploadData.res_photos.cover_url.trim() &&
        uploadData.address.trim() &&
        uploadData.suburb.trim() &&
        uploadData.city.trim()

    const canSubmit = requiredFieldsFilled && !hasErrors;

    return {uploadData,uploadErrors,handleChange,validateForm,canSubmit};
}

export default useUploadResidences;