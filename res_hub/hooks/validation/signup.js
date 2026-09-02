import {useState} from 'react';

const useSignupValidation=()=>{
    const [signupData, setSignupData]= useState({
        first_name:'',
        last_name:'',
        student_email:'',
        password:''
    })

    const [signupErrors, setSignupErrors]= useState({})

    const validateField=(name, value)=>{
        let error=null
        const trimmedValue = value?.trim()

        const  isValidName=/^[A-Za-z\s]+$/.test(trimmedValue)
        const isValidEmail = /^[0-9]{9}@mywsu\.ac\.za$/.test(trimmedValue)


        if(name === "first_name" || name === "last_name"){
            if(!value ||!trimmedValue){
                error = 'Field is required';
            }else if(!isValidName){
                error = 'Invalid name. Only letters areallowed';
            }
        }

        if(name === "student_email"){
            if(!value || !trimmedValue){
                error = 'Field is required';
            }else if(!isValidEmail){
                error = 'Invalid email. Must be a valid student email';
            }
        }

        if(name === "password"){
            const passwordErrors = []
            if(!value || !trimmedValue){
                passwordErrors.push('Field is required');
            }
            if(!/^(?=.*[A-Z]).*$/.test(trimmedValue)){
                passwordErrors.push('Password must contain at least one uppercase letter');
            }
            if(!/^(?=.*[a-z]).*$/.test(trimmedValue)){
                passwordErrors.push('Password must contain at least one lowercase letter');
            }
            if(!/^(?=(?:.*[\W_]){2,}).*$/.test(trimmedValue)){
                passwordErrors.push('Password must contain at least 2 special characters');
            }
            if(!/^(?=.*\d).+$/.test(trimmedValue)){
                passwordErrors.push('Password must contain at least one digit');
            }
            if(password.length <8){
                passwordErrors.push('Password must be at least 8 characters long');
            }

            error = passwordErrors.length > 0 ? passwordErrors : null;

        }

        return error  
    }

    const handleChange=(name, value)=>{
        setSignupData((prevData)=>({ ...prevData, [name]: value }))
        const error = validateField(name, value)
        setSignupErrors((prevErrors)=>({ ...prevErrors, [name]: error }))
    }

    const validateForm=()=>{
        const signupError = {}
        const updatedData = {}

        Object.keys(signupData).forEach((field)=>{
            const value = signupData[field]
            const error = validateField(field, value)

            if(error){
                signupError[field] = error
            }else{
                updatedData[field] = value.trim()
            }

            setSignupErrors(signupError)
            const isValid = Object.keys(signupError).length === 0
            return { isValid, updatedData }
        })
    }

    const hasErrors = Object.values(signupErrors).some((error)=>{
        if (Array.isArray(error)) return error.length > 0;
        return error != null;
    })

    const requiredFieldsFilled= signupData.first_name.trim() && 
                                signupData.last_name.trim() &&
                                signupData.student_email.trim() &&
                                signupData.password.trim()

    const canSumbit= requiredFieldsFilled && !hasErrors

    return {handleChange, signupData, signupErrors, validateForm, canSumbit}

}