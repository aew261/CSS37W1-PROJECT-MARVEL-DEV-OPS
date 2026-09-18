import { useMemo, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import ResidenceCard from '../common/ResidenceCard';
import styles from '../../styles/components/search.module.css';

// TODO(backend): replace with GET /residences?query=&status= from app_api.js
const ALL_RESIDENCES = [
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

const FILTERS = ['All', 'Verified', 'Under Review'];

function Search() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const results = useMemo(() => {
    return ALL_RESIDENCES.filter((residence) => {
      const matchesQuery = residence.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesFilter =
        activeFilter === 'All' || residence.status === activeFilter;
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  return (
    <div className={styles.container}>
      <h1>Search Residences</h1>

      <div className={styles.searchBar}>
        <BsSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by residence name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className={styles.filters}>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`${styles.filterChip} ${
              activeFilter === filter ? styles.filterChipActive : ''
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className={styles.empty}>No residences match your search.</p>
      ) : (
        <div className={styles.grid}>
          {results.map((residence) => (
            <ResidenceCard key={residence.id} residence={residence} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;