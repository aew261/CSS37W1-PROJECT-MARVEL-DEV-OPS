import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {useFetchSystemStataQuery, useFetchResidencesAdminQuery} from '../../api/app_api';
import { SAMPLE_RESIDENCES, SAMPLE_CATEGORY_RATINGS } from './adminData';
import styles from '../../styles/components/admin_dashboard.module.css';

// Home / Analytics: overview statistics, system metrics and residence analytics.
function AdminDashboard() {
  
  const residences = SAMPLE_RESIDENCES;

  const totalReviews = residences.reduce((sum, r) => sum + r.reviews, 0);
  const verified = residences.filter((r) => r.status === 'Verified').length;
  

  const {data:systemStats, isLoading, error, isError} = useFetchSystemStataQuery();
  const {data:residence, isLoading:resLoading, error:resError}=useFetchResidencesAdminQuery()

  useEffect(()=>{

    if(systemStats){
      console.log("System stats fetched:", systemStats);
    }

    if(error){
      console.log(error)
    }

    if(residence){
      console.log("RES: ",residence)
    }

    if(resError){
      console.log("RES ERROR:", resError)
    }
  })

  const stats = [
    { title: 'Total Residences', value: systemStats?.data?.residenceCount },
    { title: 'Total Reviews', value: systemStats?.data?.reviewCount },
    { title: 'Total Users', value: systemStats?.data?.userCount },
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
              {residence?.data?.map((r) => (
                <tr key={r.id}>

                  <td>
                    <strong>{r.name}</strong>
                    <span className={styles.cellSub}>{r.address}</span>
                  </td>

                  <td>
                    <span className={styles.ratingCell}>
                      <FaStar className={styles.star} aria-hidden="true" /> {(r.overall_ratings?.overall.toFixed(1)) || 0}
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