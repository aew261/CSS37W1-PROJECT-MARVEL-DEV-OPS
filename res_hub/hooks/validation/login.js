import {useState} from 'react';

const useLoginValidation=()=>{

    const [loginData, setLoginData]= useState({
        student_email:'',
        password:''
    })

    const [loginErrors, setLoginErrors]= useState({})

    /*
        FUNCTION VALIDATE FIELDS USING 2 PARAMETERS
        NAME(name of the field) &
        VALUE(value from the field)
    */
    const validateField=(name,value)=>{
        let error=null
        const trimmed = value.trim()

        const isEmail = /^[0-9]{9}@mywsu\.ac\.za$/.test(trimmed)

        if(name === "student_email"){
            if(!value || !trimmed){
                error = 'Student email is required'
            }else if(!isEmail){
                error = 'Invalid student email address'
            }
        }

        if(name === "password"){
            if(!value || !trimmed){
                error = 'Password is required'
            }else if(trimmed.length < 6){
                error = 'Password must be at least 6 characters'
            }
        }

        return error
    }

    const handleChange=(name, value)=>{
        setLoginData((prev)=>({...prev, [name]:value}))
        const error = validateField(name, value)
        setLoginErrors((prev)=>({...prev, [name]:error}))
    }

    const validateForm=()=>{
        let loginErrors = {}
        let updatedData = {}

        Object.keys(loginData).forEach((field)=>{
            const value = loginData[field]
            const error = validateField(field, value)

            if(error){
                loginErrors[field] = error
            }else{
                updatedData[field] = value.trim()
            }

            setLoginErrors(loginErrors)

            let isValid =Object.keys(loginErrors).length === 0

            return {isValid, updatedData}
        })


    }

    const hasErrors=Object.values(loginErrors).some((error)=>{
        return error != null
    })

    const requiredFieldsFilled=loginData.student_email.trim() && loginData.password.trim()

    const canSubmit= requiredFieldsFilled && !hasErrors

    return {loginData, loginErrors, handleChange, validateForm, canSubmit}
}