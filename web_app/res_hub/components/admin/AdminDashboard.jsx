import styles from '../../styles/components/admin_dashboard.module.css';

function AdminDashboard() {
  return (<>
    <div className={styles.container}>

      <div className={styles.header}>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage ResHub activities and reports.</p>
        </div>
      </div>

      <section className={styles.statsGrid}>

        <div className={styles.statCard}>
          <span className={styles.statTitle}>Total Residences</span>
          <strong className={styles.statNumber}>0</strong>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statTitle}>Total Reviews</span>
          <strong className={styles.statNumber}>0</strong>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statTitle}>Maintenance Reports</span>
          <strong className={styles.statNumber}>0</strong>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statTitle}>Pending Reports</span>
          <strong className={styles.statNumber}>0</strong>
        </div>

      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Recent Reviews</h2>
            <p>Latest residence reviews submitted by students.</p>
          </div>
        </div>

        <div className={styles.emptyState}>
          <p>No reviews available yet.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Maintenance Reports</h2>
            <p>Recent maintenance issues reported by students.</p>
          </div>
        </div>

        <div className={styles.emptyState}>
          <p>No maintenance reports available yet.</p>
        </div>
      </section>

    </div>
  </>);
}

export default AdminDashboard;
