import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useFetchListingsQuery, useSuggestResQuery } from '../../api/app_api';
 
import ResidenceCard from '../common/ResidenceCard';
import styles from '../../styles/components/search.module.css';



function Search() {
   
   const [query, setQuery] = useState('');
   const [suggestions,setSuggestions]=useState([])
   const [showSuggestion, setShowSuggestion]=useState(false)

  const navigate=useNavigate()

   

   const {data:suggestData, error:suggestError}=useSuggestResQuery(query.trim(),{skip: query.trim().length < 1,})
   
   useEffect(()=>{
      if(suggestData){
        setSuggestions(suggestData.data)
        console.log(suggestData)
      }

      if(suggestError){
        console.log(suggestError)
      }
   },[suggestError,suggestData])

   

  

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
          onFocus={()=>setShowSuggestion(true)}
          onBlur={()=>{setShowSuggestion(false), setSuggestions([])}}
        />

        {suggestions.length > 0 && showSuggestion &&
          (<div className={styles.suggestion_section}  >
              {suggestions.map((item,ind)=>(
                  <div  
                        className={styles.suggestion_card} 
                        onMouseDown={() => navigate('/residence_info', {state: { id: item.id },})}
                        key={ind}
                  >
                    <BsSearch className={styles.search_icon}  />
                    <p>{item.name}</p>
                  </div>
              ))}
          </div>)
        }

      </div>

      
    </div>
  );
}

export default Search;