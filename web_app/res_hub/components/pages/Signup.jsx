import { Link } from 'react-router-dom';
import useSignupValidation from '../../hooks/validation/signup';
import styles from '../../styles/components/auch.module.css';

function Signup() {
  const { signupData, signupErrors, handleChange, validateForm, canSumbit } =
    useSignupValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, updatedData } = validateForm();
    if (!isValid) return;

    // TODO(backend): wire this up to authApi (RTK Query) or supabase auth
    // once the signup endpoint / supabase call is ready.
    console.log('Signup submitted:', updatedData);
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

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <h1>Create Account</h1>
        <p className={styles.subtitle}>Join ResHub with your student email</p>

        <div className={styles.row}>
          <label className={styles.field}>
            <span>First Name *</span>
            <input
              type="text"
              placeholder="Enter first name"
              value={signupData.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
            />
            {renderError('first_name')}
          </label>

          <label className={styles.field}>
            <span>Last Name *</span>
            <input
              type="text"
              placeholder="Enter last name"
              value={signupData.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
            />
            {renderError('last_name')}
          </label>
        </div>

        <label className={styles.field}>
          <span>Student Email *</span>
          <input
            type="email"
            placeholder="221234567@mywsu.ac.za"
            value={signupData.student_email}
            onChange={(e) => handleChange('student_email', e.target.value)}
          />
          {renderError('student_email')}
        </label>

        <label className={styles.field}>
          <span>Password *</span>
          <input
            type="password"
            placeholder="Create a password"
            value={signupData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          {renderError('password')}
        </label>

        <button type="submit" className={styles.submitBtn} disabled={!canSumbit}>
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