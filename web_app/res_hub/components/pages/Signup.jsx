import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useSignupMutation} from '../../api/auth_api'

import useSignupValidation from '../../hooks/validation/signup';
import styles from '../../styles/components/auch.module.css';

function Signup() {

  const navigate = useNavigate()
  const [handleSignup,{data, error, isLoading}]=useSignupMutation()
  const { signupData, signupErrors, handleChange, validateForm, canSumbit } =useSignupValidation();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { isValid, updatedData } = validateForm();
    if (!isValid) return;
    try{

      const user_data={
        first_name:updatedData.first_name,
        last_name:updatedData.last_name,
        student_email:updatedData.student_email,
        password:updatedData.password
      }

     const result = await handleSignup(user_data)
      if(result.data.success){
        navigate('/Login')
      }
     



    }catch(error){
      console.log("Error: ", error)
    }

    
    
  };

  const renderError = (field) => {
    const error = signupErrors[field];
    if (!error) return null;
    const messages = Array.isArray(error) ? error : [error];
    return (
      <ul className={styles.errorList}>
        {messages.map((msg) => (
          <li key={msg}>{msg}</li>
        ))}
      </ul>
    );
  };

  useEffect(()=>{
    //console.log(signupData)
  },[signupData])

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Join ResHub with your student email</p>

        
          <div className={styles.field}>
            <span>First Name *</span>
            <input
              type="text"
              placeholder="Enter first name"
              value={signupData.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
            />
            {renderError('first_name')}
          </div>

          <div className={styles.field}>
            <span>Last Name *</span>
            <input
              type="text"
              placeholder="Enter last name"
              value={signupData.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
            />
            {renderError('last_name')}
          </div>


          <div className={styles.field}>
            <span>Student Email *</span>
            <input
              type="email"
              placeholder="221234567@mywsu.ac.za"
              value={signupData.student_email}
              onChange={(e) => handleChange('student_email', e.target.value)}
            />
            {renderError('student_email')}
          </div>

          <div className={styles.field}>
            <span>Password *</span>
            <input
              type="password"
              placeholder="Create a password"
              value={signupData.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            {renderError('password')}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={!canSumbit} onClick={handleSubmit}   >
            Sign Up
          </button>

          <p className={styles.switchAuth}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>


      </form>
    </div>
  );
}

export default Signup;
