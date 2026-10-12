
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../api/auth_api';
import { supabase } from '../../lib/supabase';
import Toast from '../common/Toast';
import useSignupValidation from '../../hooks/validation/signup';
import styles from '../../styles/components/auch.module.css';

function Signup() {
  const navigate = useNavigate();

  const [handleSignup, { isLoading }] = useSignupMutation();

  const {
    signupData,
    signupErrors,
    handleChange,
    validateForm,
    canSumbit,
  } = useSignupValidation();

  const [formError, setFormError] = useState(null);

  const renderError = (field) => {
    const error = signupErrors[field];

    if (!error) return null;

    const messages = Array.isArray(error) ? error : [error];

    return (
      <ul className={styles.errorList}>
        {messages.map((msg, index) => (
          <li key={`${field}-${index}`}>{msg}</li>
        ))}
      </ul>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);

    const { isValid, updatedData } = validateForm();

    if (!isValid) return;

    try {
      const userData = {
        first_name: updatedData.first_name,
        last_name: updatedData.last_name,
        student_email: updatedData.student_email,
        password: updatedData.password,
      };

      const result = await handleSignup(userData).unwrap();

      // Preserve the response shape used by the existing backend.
      const session = result?.data?.session;

      if (!result?.success) {
        throw new Error(
          result?.message || 'Account creation failed. Please try again.'
        );
      }

      if (!session?.access_token || !session?.refresh_token) {
        throw new Error(
          'Your account may have been created, but no login session was returned. Try logging in.'
        );
      }

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
          userError?.message || 'Unable to verify your new account.'
        );
      }

      const { data: profile, error: profileError } = await supabase
        .from('users_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profile) {
        throw new Error(
          profileError?.message ||
          'Your account was created, but the user profile could not be loaded. Try logging in.'
        );
      }

      if (profile.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Signup failed:', err);

      setFormError(
        err?.data?.error?.message ||
        err?.data?.message ||
        err?.message ||
        'Unable to create your account. Please try again.'
      );
    }
  };

  return (
    <div className={styles.container}>
      {formError && (
        <Toast
          title="Signup failed"
          content={formError}
          type="error"
        />
      )}

      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>
          Join ResHub with your student email
        </p>

        <div className={styles.field}>
          <span>First Name *</span>
          <input
            type="text"
            autoComplete="given-name"
            placeholder="Enter first name"
            value={signupData.first_name}
            onChange={(e) =>
              handleChange('first_name', e.target.value)
            }
            aria-invalid={Boolean(signupErrors.first_name)}
          />
          {renderError('first_name')}
        </div>

        <div className={styles.field}>
          <span>Last Name *</span>
          <input
            type="text"
            autoComplete="family-name"
            placeholder="Enter last name"
            value={signupData.last_name}
            onChange={(e) =>
              handleChange('last_name', e.target.value)
            }
            aria-invalid={Boolean(signupErrors.last_name)}
          />
          {renderError('last_name')}
        </div>

        <div className={styles.field}>
          <span>Student Email *</span>
          <input
            type="email"
            autoComplete="email"
            placeholder="221234567@mywsu.ac.za"
            value={signupData.student_email}
            onChange={(e) =>
              handleChange('student_email', e.target.value)
            }
            aria-invalid={Boolean(signupErrors.student_email)}
          />
          {renderError('student_email')}
        </div>

        <div className={styles.field}>
          <span>Password *</span>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={signupData.password}
            onChange={(e) =>
              handleChange('password', e.target.value)
            }
            aria-invalid={Boolean(signupErrors.password)}
          />
          {renderError('password')}
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!canSumbit || isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <span className={styles.loadingSpinner} />
              Creating account...
            </>
          ) : (
            'Sign Up'
          )}
        </button>

        <p className={styles.switchAuth}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;