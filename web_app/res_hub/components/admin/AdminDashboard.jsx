import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { SAMPLE_RESIDENCES, SAMPLE_CATEGORY_RATINGS } from './adminData';
import styles from '../../styles/components/admin_dashboard.module.css';

// Home / Analytics: overview statistics, system metrics and residence analytics.
function AdminDashboard() {
  
  const residences = SAMPLE_RESIDENCES;

  const totalReviews = residences.reduce((sum, r) => sum + r.reviews, 0);
  const openIssues = residences.reduce((sum, r) => sum + r.openIssues, 0);
  const verified = residences.filter((r) => r.status === 'Verified').length;
  const underReview = residences.length - verified;
  const averageRating = totalReviews? 
    residences.reduce((sum, r) => sum + r.rating * r.reviews, 0) / totalReviews : 0;

  const stats = [
    { title: 'Total Residences', value: residences.length },
    { title: 'Total Reviews', value: totalReviews },
    { title: 'Average Rating', value: averageRating.toFixed(1) },
  ];


  

  return (<>
    <div className={styles.container}>

      <div className={styles.header}>

        <div>
          <h1>Home / Analytics</h1>
          <p>Overview of residences, student reviews and maintenance reports.</p>
        </div>

        <Link to="/admin/upload" className={styles.primaryLink}>
          + Upload Residence
        </Link>

      </div>

      

      {/* ---- Overview statistics ---- */}
      <section className={styles.statsGrid} aria-label="Overview statistics">
        {stats.map((stat) => (
          <div key={stat.title} className={styles.statCard}>
            <span className={styles.statTitle}>{stat.title}</span>
            <strong className={styles.statNumber}>{stat.value}</strong>
          </div>
        ))}
      </section>

      {/* ---- Category ratings across all residences ---- */}
      <section className={styles.section}>

        <div className={styles.sectionHeader}>

          <div>
            <h2>Average Category Ratings</h2>
            <p>How students rate residences on average, out of 5.</p>
          </div>
          
        </div>

        <ul className={styles.barList}>
          {SAMPLE_CATEGORY_RATINGS.map(({ label, score }) => (
            <li key={label} className={styles.barRow}>
              <span className={styles.barLabel}>{label}</span>
              <div
                className={styles.barTrack}
                role="img"
                aria-label={`${label}: ${score} out of 5`}
              >
                <div className={styles.barFill} style={{ width: `${(score / 5) * 100}%` }} />
              </div>
              <span className={styles.barValue}>{score.toFixed(1)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Residence overview table ---- */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Residence Overview</h2>
            <p>Ratings, review counts and open issues for every listed residence.</p>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>

            <thead>
              <tr>
                <th>Residence</th>
                <th>Rating</th>
                <th>Reviews</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {residences.map((r) => (
                <tr key={r.id}>

                  <td>
                    <strong>{r.name}</strong>
                    <span className={styles.cellSub}>{r.address}</span>
                  </td>

                  <td>
                    <span className={styles.ratingCell}>
                      <FaStar className={styles.star} aria-hidden="true" /> {r.rating.toFixed(1)}
                    </span>
                  </td>

                  <td>{r.reviews}</td>
                  
                  <td>
                    <span
                      className={`status-badge ${
                        r.status === 'Verified' ? 'status-verified' : 'status-review'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>


          </table>
        </div>

      </section>

      

    </div>
  </>);
}

export default AdminDashboard;