import { useState, useEffect} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useLoginMutation } from '../../api/auth_api';
import { supabase } from '../../lib/supabase';

import useLoginValidation from '../../hooks/validation/login';
import styles from '../../styles/components/auch.module.css';
import Toast from '../common/Toast';



function Login() {
  const { loginData, loginErrors, handleChange, validateForm, canSubmit } = useLoginValidation();
  const [handleLogin, { error,isLoading }] = useLoginMutation();
  const navigate=useNavigate()
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  
    const handleSubmit = async(e) => {

      e.preventDefault();
      setFormError(null);
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

        }

        const { data: { user }, error: userError } = await supabase.auth.getUser();


        if (userError || !user) {
            console.log("User error:", userError);
            return;
        }
        
        
        const {data,error}=await supabase.from("users_profiles")
                                         .select('*')
                                         .eq("user_id",user.id)
                                         .single();
         if (error) {
            console.log("Profile error:", error);
            return;
        }

        setFormSuccess(result.data.message);
       
        if(data.role==="admin"){
          navigate('/admin')
        }else{
          navigate('/')
        }

      }catch(error){
        console.log(error)
        return;
      }
    
    };

    // THIS HOW WE GET THE ERROR
    useEffect(()=>{
      if(error){
        
        setFormError(error.data.error.message)
      }
    },[error])

  return (
    <div className={styles.container}>

      {(formError || formSuccess) && 
        ( <Toast title={formError ? "Error" : "Success"} 
                 content={formError || formSuccess} 
                 type={formError ? "error" : "success"} 
          />)}

      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1>Log In</h1>
        <p className={styles.subtitle}>Welcome back to ResHub</p>

       

        <label className={styles.field}>
          <span>Email *</span>
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

        <button type="submit" className={styles.submitBtn} disabled={!canSubmit || isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>

        <p className={styles.switchAuth}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>

      </form>

    </div>
  );
}

export default Login;