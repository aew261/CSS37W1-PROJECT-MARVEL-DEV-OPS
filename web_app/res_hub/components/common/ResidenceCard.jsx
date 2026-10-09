import { FaStar, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/residence_card.module.css';

function ResidenceCard({ residence }) {
  const { image_url, name, rating, status,id } = residence;

  const statusClass =status === 'Verified' ? 'status-verified' : 'status-review';
  const navigate = useNavigate()

  return (
    <article className={styles.card}  onClick={()=> navigate('/residence_info',{ state: { id }})}   >

      <div className={styles.imageWrapper}>
        <img src={image_url} alt={name} className={styles.image} />
        <button className={styles.heartBtn} aria-label="Save residence">
          <FaRegHeart />
        </button>
      </div>

      <div className={styles.body}>

        <div className={styles.rating}>
          <FaStar className={styles.star} />
          <span>{rating.toFixed(1)}</span>
        </div>

        <h3 className={styles.title}>{name}</h3>

        <p className={styles.address}>
          <FaMapMarkerAlt className={styles.pin} />
          {/*address*/}
        </p>

        <span className={`status-badge ${statusClass}`}>
          {status}
        </span>
        
      </div>
    </article>
  );
}

export default ResidenceCard;