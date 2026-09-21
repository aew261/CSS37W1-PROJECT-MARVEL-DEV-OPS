import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/auth_api';
import { supabase } from '../../lib/supabase';

import useLoginValidation from '../../hooks/validation/login';
import styles from '../../styles/components/auch.module.css';

function Login() {
  const navigate=useNavigate()
  const { loginData, loginErrors, handleChange, validateForm, canSubmit } = useLoginValidation();
  const [handleLogin,{data, error, isLoading}]=useLoginMutation()

  const handleSubmit = async(e) => {

    e.preventDefault();
    const { isValid, updatedData } = validateForm();
    if (!isValid) return;

    try{
      const user_data={
        student_email:updatedData.student_email,
        password:updatedData.password
      }

      const result = await handleLogin(user_data)

      const {session}=result.data.loginData

      

      if(result.data.success && result.data.loginData){
          await supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          });

          navigate('/')
      }
      /*if(result.data.success){
        

        
        console.log("hey")
      }*/

      console.log(result);

    }catch(error){
      console.log(error)
      return;
    }
    
  };

  return (
    <div className={styles.container}>

      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1>Log In</h1>
        <p className={styles.subtitle}>Welcome back to ResHub</p>

        <label className={styles.field}>
          <span>Student Email *</span>
          <input
            type="email"
            placeholder="221234567@mywsu.ac.za"
            value={loginData.student_email}
            onChange={(e) => handleChange('student_email', e.target.value)}
          />
          {loginErrors.student_email && (
            <span className={styles.error}>{loginErrors.student_email}</span>
          )}
        </label>

        <label className={styles.field}>
          <span>Password *</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          {loginErrors.password && (
            <span className={styles.error}>{loginErrors.password}</span>
          )}
        </label>

        <button type="submit" className={styles.submitBtn} disabled={!canSubmit} onClick={handleSubmit} >
            Log In
        </button>

        <p className={styles.switchAuth}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>

      </form>

    </div>
  );
}

export default Login;