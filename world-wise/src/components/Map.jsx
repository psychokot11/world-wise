import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './Map.module.css'

function Map() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const navigate = useNavigate()

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>{lat} {lng}</h1>
      <button onClick={() => setSearchParams({lat: 22, lng: 4000})}>
        Change location
      </button>
    </div> 
  )
}

export default Map