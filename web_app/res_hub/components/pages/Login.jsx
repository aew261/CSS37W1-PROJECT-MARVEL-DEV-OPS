
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/auth_api';
import { supabase } from '../../lib/supabase';
import useLoginValidation from '../../hooks/validation/login';
import styles from '../../styles/components/auch.module.css';
import Toast from '../common/Toast';

function Login() {
  const {
    loginData,
    loginErrors,
    handleChange,
    validateForm,
    canSubmit,
  } = useLoginValidation();

  const [handleLogin, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);
    setFormSuccess(null);

    const { isValid, updatedData } = validateForm();

    if (!isValid) return;

    try {
      const userData = {
        student_email: updatedData.student_email,
        password: updatedData.password,
      };

      // .unwrap() sends failed API responses to catch.
      const result = await handleLogin(userData).unwrap();

      if (!result?.success || !result?.loginData?.session) {
        throw new Error(
          result?.message || 'Login failed. Please try again.'
        );
      }

      const { session } = result.loginData;

      const { error: sessionError } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      if (sessionError) {
        throw new Error(
          sessionError.message || 'Unable to establish your login session.'
        );
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          userError?.message || 'Unable to verify your account.'
        );
      }

      const { data: profile, error: profileError } = await supabase
        .from('users_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profile) {
        throw new Error(
          profileError?.message || 'Unable to load your user profile.'
        );
      }

      setFormSuccess('Login successful!');

      if (profile.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Login failed:', err);

      setFormError(
        err?.data?.error?.message ||
        err?.data?.message ||
        err?.message ||
        'Unable to log in. Please check your details and try again.'
      );
    }
  };

  return (
    <div className={styles.container}>
      {(formError || formSuccess) && (
        <Toast
          title={formError ? 'Login failed' : 'Success'}
          content={formError || formSuccess}
          type={formError ? 'error' : 'success'}
        />
      )}

      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1>Log In</h1>
        <p className={styles.subtitle}>Welcome back to ResHub</p>

        <label className={styles.field}>
          <span>Email *</span>

          <input
            type="email"
            autoComplete="email"
            placeholder="221234567@mywsu.ac.za"
            value={loginData.student_email}
            onChange={(e) =>
              handleChange('student_email', e.target.value)
            }
            aria-invalid={Boolean(loginErrors.student_email)}
          />

          {loginErrors.student_email && (
            <span className={styles.error}>
              {loginErrors.student_email}
            </span>
          )}
        </label>

        <label className={styles.field}>
          <span>Password *</span>

          <input
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={(e) =>
              handleChange('password', e.target.value)
            }
            aria-invalid={Boolean(loginErrors.password)}
          />

          {loginErrors.password && (
            <span className={styles.error}>
              {loginErrors.password}
            </span>
          )}
        </label>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!canSubmit || isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className={styles.loadingSpinner} />
              Logging in...
            </>
          ) : (
            'Log In'
          )}
        </button>

        <p
          className={styles.switchAuth}
          style={{ textAlign: 'right', marginTop: '1rem' }}
        >
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p  className={styles.switchAuth} 
            style={{ textAlign: 'right', marginTop: '1rem' }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p className={styles.switchAuth}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;