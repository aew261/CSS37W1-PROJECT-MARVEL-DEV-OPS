
import { useState } from 'react';
import { useAddAdminMutation } from '../../api/app_api';
import Toast from '../common/Toast';
import styles from '../../styles/components/AddAdmin.module.css';

export default function AddAdmin() {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState(null);

  const [handleAdmin, { isLoading }] = useAddAdminMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setToast(null);

    const studentEmail = email.trim();

    if (!studentEmail) {
      setToast({
        title: 'Email required',
        content: 'Enter the student email of the administrator.',
        type: 'error',
      });
      return;
    }

    try {
      const result = await handleAdmin({
        student_email: studentEmail,
      }).unwrap();

      if (result?.success === false) {
        throw new Error(
          result?.message || 'Unable to add this administrator.'
        );
      }

      setEmail('');

      setToast({
        title: 'Admin added',
        content:
          result?.message ||
          'The administrator request completed successfully.',
        type: 'success',
      });
    } catch (err) {
      console.error('Add admin failed:', err);

      setToast({
        title: 'Unable to add admin',
        content:
          err?.data?.error?.message ||
          err?.data?.message ||
          err?.message ||
          'The administrator could not be added. Please try again.',
        type: 'error',
      });
    }
  };

  return (
    <main className={styles.container}>
      {toast && (
        <Toast
          title={toast.title}
          content={toast.content}
          type={toast.type}
        />
      )}

      <header className={styles.header}>
        <div>
          <h1>Add an admin</h1>
          <p>Enter the student email of the administrator.</p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Admin details</h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="admin-email">Student Email</label>

            <input
              autoComplete="email"
              id="admin-email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              type="email"
              value={email}
              disabled={isLoading}
            />
          </div>

          <div className={styles.actions}>
            <button
              className={styles.secondaryButton}
              type="button"
              disabled={isLoading}
              onClick={() => {
                setEmail('');
                setToast(null);
              }}
            >
              Clear
            </button>

            <button
              className={styles.primaryButton}
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.loadingSpinner} />
                  Adding admin...
                </>
              ) : (
                'Add Admin'
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}