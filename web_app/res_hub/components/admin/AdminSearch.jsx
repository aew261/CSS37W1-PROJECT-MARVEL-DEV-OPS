import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { SAMPLE_RESIDENCES } from './adminData';
import styles from '../../styles/components/admin_layout.module.css';

// Global search bar for the admin header.
// Typing shows matching residences; Enter (or clicking a result) opens the
// student Search page pre-filled with that text (/search?q=...).
function AdminSearch() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return SAMPLE_RESIDENCES.filter(
      (r) =>
        r.name.toLowerCase().includes(term) ||
        r.address.toLowerCase().includes(term)
    ).slice(0, 5);
  }, [query]);

  // Close the dropdown when clicking anywhere outside the search box.
  useEffect(() => {
    const handleOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const goToSearch = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    goToSearch(query);
  };

  return (
    <div className={styles.search} ref={wrapperRef}>
      <form onSubmit={handleSubmit} role="search">
        <BsSearch className={styles.searchIcon} aria-hidden="true" />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search residences..."
          aria-label="Search residences"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        />
      </form>

      {open && query.trim() && (
        <ul className={styles.searchResults}>
          {matches.length === 0 ? (
            <li className={styles.searchEmpty}>No residences match &quot;{query.trim()}&quot;</li>
          ) : (
            matches.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  className={styles.searchResult}
                  onClick={() => goToSearch(r.name)}
                >
                  <span className={styles.searchResultName}>{r.name}</span>
                  <span className={styles.searchResultMeta}>{r.address}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default AdminSearch;