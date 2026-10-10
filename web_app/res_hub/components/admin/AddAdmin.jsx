import { useState } from 'react';
import styles from '../../styles/components/AddAdmin.module.css';

const initialValues = {
  name: '',
  email: '',
  role: 'Administrator',
};

export default function AddAdmin({ onSubmit, onCancel }) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setMessage('');
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!onSubmit) {
      setError('Admin creation is not connected yet.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role,
      });
      setMessage(`An invitation was sent to ${values.email.trim()}.`);
      setValues(initialValues);
    } catch (submitError) {
      setError(submitError?.message || 'Could not add this admin. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Add an admin</h1>
          <p>Invite someone to help manage your dashboard.</p>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="admin-form-title">
        <div className={styles.sectionHeader}>
          <h2 id="admin-form-title">Admin details</h2>
          <p>They’ll receive an email invitation to set up their account.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="admin-name">Full name</label>
            <input
              autoComplete="name"
              id="admin-name"
              name="name"
              onChange={handleChange}
              placeholder="e.g. Jordan Smith"
              required
              value={values.name}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admin-email">Email address</label>
            <input
              autoComplete="email"
              id="admin-email"
              name="email"
              onChange={handleChange}
              placeholder="name@example.com"
              required
              type="email"
              value={values.email}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="admin-role">Access level</label>
            <select aria-describedby="admin-role-help" id="admin-role" name="role" onChange={handleChange} value={values.role}>
              <option value="Administrator">Administrator</option>
              <option value="Manager">Manager</option>
              <option value="Read-only">Read-only</option>
            </select>
            <span className={styles.helpText} id="admin-role-help">
              You can change this person’s access level later.
            </span>
          </div>

          {message && <p className={styles.successMessage} role="status">{message}</p>}
          {error && <p className={styles.errorMessage} role="alert">{error}</p>}

          <div className={styles.actions}>
            {onCancel && (
              <button className={styles.secondaryButton} onClick={onCancel} type="button">
                Cancel
              </button>
            )}
            <button className={styles.primaryButton} disabled={submitting} type="submit">
              {submitting ? 'Sending invitation…' : 'Send invitation'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
