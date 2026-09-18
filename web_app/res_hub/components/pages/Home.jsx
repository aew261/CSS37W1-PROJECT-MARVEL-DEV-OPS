import { Link } from 'react-router-dom';
import ResidenceCard from '../common/ResidenceCard';
import styles from '../../styles/components/home.module.css';

// TODO(backend): replace with real data from app_api.js once the
// GET /residences?featured=true endpoint exists.
const FEATURED_RESIDENCES = [
  {
    id: 1,
    title: 'Bolitha Residence',
    address: '4.5 · 10 Kingfisher str, Southernwood, Mthatha',
    rating: 4.5,
    status: 'Verified',
    image: 'https://placehold.co/400x300?text=Bolitha',
  },
  {
    id: 2,
    title: 'Amaxesibe 4 Residence',
    address: '4.5 · 198 1st avenue, ncambedlana, Mthatha',
    rating: 4.5,
    status: 'Verified',
    image: 'https://placehold.co/400x300?text=Amaxesibe',
  },
  {
    id: 3,
    title: 'Nkosinathi Residence',
    address: '4.5 · 68 4th Avenue, Norwood, Mthatha',
    rating: 4.5,
    status: 'Under Review',
    image: 'https://placehold.co/400x300?text=Nkosinathi',
  },
];

function Home() {
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
          {FEATURED_RESIDENCES.map((residence) => (
            <ResidenceCard key={residence.id} residence={residence} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;