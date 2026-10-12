
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import styles from '../../styles/components/auch.module.css';
import Toast from '../common/Toast';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email.trim());

      if (resetError) {
        throw resetError;
      }

      setMessage('If the account exists, a password reset email has been requested. Please check your inbox.');

      setTimeout(() => {
        navigate('/verify-reset-otp', {
          state: { email: email.trim() }
        });
      }, 1800);
    } catch (err) {
      setError(err.message || 'Unable to request a password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {(error || message) && (
        <Toast
          title={error ? 'Error' : 'Confirm Email'}
          content={error || message}
          type={error ? 'error' : 'success'}
        />
      )}

      <form
        className={styles.card}
        onSubmit={handleSubmit}
        noValidate
      >
        <h1>Forgot Password?</h1>

        <p className={styles.subtitle}>
          Enter your registered email address to receive a password
          reset code.
        </p>

        <label className={styles.field}>
          <span>Email Address *</span>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Code'}
        </button>

        <p className={styles.switchAuth}>
          Remember your password? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;
