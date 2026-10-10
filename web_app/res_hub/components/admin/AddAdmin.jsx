import { useState } from 'react';
import { useAddAdminMutation } from '../../api/app_api';
import styles from '../../styles/components/AddAdmin.module.css';

export default function AddAdmin() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [handleAdmin,{data}]=useAddAdminMutation()

  const handleSubmit=async()=>{
    if(!email || email === '' || !email?.trim()) return;
    try{
        const results= await handleAdmin({student_email:email})
        console.log(results)
    }catch(error){

    }
  }

  

  return (
    <main className={styles.container}>

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

        <div className={styles.form}   >

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
            />
          </div>

          {error && (
            <p className={styles.errorMessage} role="alert">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            
            <button
                className={styles.secondaryButton}
                type="button"
              >
                Cancel
            </button>
            
            <button
              className={styles.primaryButton}
              onClick={handleSubmit}
              disabled={submitting}
              type="submit"
            >
              {submitting ? 'Adding...' : 'Add Admin'}
            </button>

          </div>

        </div>
      </section>
    </main>
  );
}

