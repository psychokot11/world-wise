import { useSearchParams, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import styles from './Map.module.css'
import { useState } from 'react'
import { useCities } from '../contexts/CitiesContext'

function Map() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const [mapPosition, setMapPosition] = useState([40.46635901755316, -3.713378906250000])
  const { cities } = useCities()

  return (
    <div className={styles.mapContainer}>
      <MapContainer 
        className={styles.map} 
        center={mapPosition} zoom={13} 
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
            <Marker 
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.ciityName}</span>
              </Popup>
            </Marker>
        ))}
      </MapContainer>
    </div> 
  )
}

export default Map