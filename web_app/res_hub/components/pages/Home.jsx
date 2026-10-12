
import { Link, useNavigate } from 'react-router-dom';
import { useFetchListingsQuery } from '../../api/app_api';
import { IoSearchSharp } from 'react-icons/io5';

import ResidenceCard from '../common/ResidenceCard';
import Toast from '../common/Toast';
import styles from '../../styles/components/home.module.css';

function Home() {
  const {
    data: FEATURED_RESIDENCES,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useFetchListingsQuery();

  const navigate = useNavigate();

  const residences = FEATURED_RESIDENCES?.data ?? [];

  return (
    <div className={styles.container}>
      {error && (
        <Toast
          title="Unable to load residences"
          content="Please check your connection and try again."
          type="error"
        />
      )}

      <section className={styles.top_section}>
        <div className={styles.top_section_text}>
          <h1>Find your Ideal Residence</h1>
          <p>Reviews from WSU students about accommodations</p>
        </div>

        <div
          className={styles.search_bar}
          onClick={() => navigate('/search')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/search');
            }
          }}
        >
          <input
            type="text"
            placeholder="Search for residences..."
            aria-label="Search for residences"
            readOnly
          />
          <IoSearchSharp className={styles.searchIcon} size={16} />
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredHeader}>
          <div>
            <h2>Featured Residences</h2>
          </div>

          <Link to="/search" className={styles.viewAll}>
            Browse Residences
          </Link>
        </div>

        {isLoading ? (
          <p role="status">Loading residences...</p>
        ) : error ? (
          <div role="alert">
            <p>We could not load the residences.</p>

            <button
              type="button"
              onClick={refetch}
              disabled={isFetching}
            >
              {isFetching ? 'Retrying...' : 'Try again'}
            </button>
          </div>
        ) : residences.length === 0 ? (
          <p>No residences are available at the moment.</p>
        ) : (
          <div className={styles.grid}>
            {residences.map((residence) => (
              <ResidenceCard
                key={residence.id}
                residence={residence}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;