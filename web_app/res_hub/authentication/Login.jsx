import { Link } from 'react-router-dom';
import useLoginValidation from '../../hooks/validation/login';
import styles from '../../styles/components/auth.module.css';

function Login() {
  const { loginData, loginErrors, handleChange, validateForm, canSubmit } =
    useLoginValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, updatedData } = validateForm();
    if (!isValid) return;

    // TODO(backend): wire this up to authApi (RTK Query) or supabase auth
    // once the login endpoint / supabase call is ready.
    console.log('Login submitted:', updatedData);
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

        <button type="submit" className={styles.submitBtn} disabled={!canSubmit}>
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