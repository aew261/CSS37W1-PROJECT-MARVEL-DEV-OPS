import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetchListingsQuery } from '../../api/app_api';
import { IoSearchSharp } from "react-icons/io5";

import ResidenceCard from '../common/ResidenceCard';
import styles from '../../styles/components/home.module.css';



function Home() {
  const {data:FEATURED_RESIDENCES,error}=useFetchListingsQuery()

  useEffect(()=>{
    console.log(FEATURED_RESIDENCES)
  })

  const navigate = useNavigate();


  return (
    <div className={styles.container}>

      <section className={styles.top_section}  >
        <div   className={styles.top_section_text}>
              <h1>Find your Ideal Residence</h1>
              <p>Reviews from WSU students about accomodations</p>
        </div>

        <div  className={styles.search_bar} onClick={() => navigate('/search')}>
          <input
            type="text"
            placeholder="Search for residences..."
          />
          <IoSearchSharp className={styles.searchIcon} size={10}/>
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