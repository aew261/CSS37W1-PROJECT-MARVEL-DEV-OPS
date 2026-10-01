import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetchListingsQuery } from '../../api/app_api';

import ResidenceCard from '../common/ResidenceCard';
import styles from '../../styles/components/home.module.css';

// TODO(backend): replace with real data from app_api.js once the
// GET /residences?featured=true endpoint exists.


function Home() {
  const {data:FEATURED_RESIDENCES,error}=useFetchListingsQuery()

  useEffect(()=>{
    console.log(FEATURED_RESIDENCES)
  })
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>ResHub</h1>
        <p>
          Walter Sisulu University off-campus residence review system.
          Honest, student-written reviews before you sign a lease.
        </p>
        <Link to="/search" className={styles.heroCta}>
          Browse residences
        </Link>
      </section>

      <section className={styles.featured}>

        <div className={styles.featuredHeader}>
          <div>
            <h2>Featured Residences</h2>
            <p>Show your class with flats for featured residences.</p>
          </div>
          <Link to="/search" className={styles.viewAll}>
            All lists
          </Link>
        </div>

        <div className={styles.grid}>
          {FEATURED_RESIDENCES?.data.map((residence) => (
            <ResidenceCard key={residence.id} residence={residence} />
          ))}
        </div>
        
      </section>
    </div>
  );
}

export default Home;