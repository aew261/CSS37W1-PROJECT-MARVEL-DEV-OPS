import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../api/auth_api';
import { supabase } from '../../lib/supabase';

import useLoginValidation from '../../hooks/validation/login';
import styles from '../../styles/components/auch.module.css';

// Turns an RTK Query error into a message a student can understand.
const getErrorMessage = (error) => {
  if (error?.status === 'FETCH_ERROR') {
    return 'Cannot reach the server. Check your internet connection and try again.';
  }
  if (error?.status === 429) {
    return error?.data?.message ?? 'Too many login attempts. Please wait a minute and try again.';
  }
  return error?.data?.message ?? 'Login failed. Check your email and password.';
};

function Login() {
  const { loginData, loginErrors, handleChange, validateForm, canSubmit } = useLoginValidation();
  const [handleLogin, { isLoading }] = useLoginMutation();
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const { isValid, updatedData } = validateForm();
    if (!isValid) return;

    try {
      // The edge function validates { email, password }; older versions read
      // { student_email, password }. Zod drops unknown keys, so sending both is safe.
      const result = await handleLogin({
        email: updatedData.student_email,
        student_email: updatedData.student_email,
        password: updatedData.password,
      });

      if (result.error) {
        setFormError(getErrorMessage(result.error));
        return;
      }

      const session = result.data?.loginData?.session;
      if (!result.data?.success || !session) {
        setFormError('Login failed. Please try again.');
        return;
      }

      // Saving the session is what "logs the user in" on the client.
      // AuthProvider picks it up and <GuestRoute> on /login redirects to the Homepage ("/").
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      if (sessionError) {
        setFormError('Could not start your session. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setFormError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className={styles.container}>

      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1>Log In</h1>
        <p className={styles.subtitle}>Welcome back to ResHub</p>

        {formError && (
          <div className={styles.formError} role="alert">{formError}</div>
        )}

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