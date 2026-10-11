import { useState } from 'react';

const useLoginValidation = () => {

    const [loginData, setLoginData] = useState({
        student_email: '',
        password: ''
    })

    const [loginErrors, setLoginErrors] = useState({})

    const validateField = (name, value) => {
        let error = null
        const trimmed = value?.trim() ?? ''

        // Students sign up with a 9-digit WSU email (enforced in signup.js).
        // Login accepts any well-formed email so admin/staff accounts can sign in too.
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)

        if (name === "student_email") {
            if (!trimmed) {
                error = 'Email is required'
            } else if (!isEmail) {
                error = 'Invalid email address'
            }
        }

        if (name === "password") {
            if (!trimmed) {
                error = 'Password is required'
            } else if (trimmed.length < 6) {
                error = 'Password must be at least 6 characters'
            }
        }

        return error
    }

    const handleChange = (name, value) => {
        setLoginData((prev) => ({ ...prev, [name]: value }))
        const error = validateField(name, value)
        setLoginErrors((prev) => ({ ...prev, [name]: error }))
    }

    const validateForm = () => {
        const errors = {}
        const updatedData = {}

        Object.keys(loginData).forEach((field) => {
            const value = loginData[field]
            const error = validateField(field, value)

            if (error) {
                errors[field] = error
            } else {
                updatedData[field] = value.trim()
            }
        })

        setLoginErrors(errors)
        const isValid = Object.keys(errors).length === 0
        return { isValid, updatedData }
    }

    const hasErrors = Object.values(loginErrors).some((error) => error != null)

    const requiredFieldsFilled = loginData.student_email.trim() && loginData.password.trim()

    const canSubmit = requiredFieldsFilled && !hasErrors

    return { loginData, loginErrors, handleChange, validateForm, canSubmit }
}

export default useLoginValidation