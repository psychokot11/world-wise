import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import { useUrlPosition } from '../hooks/useUrlPosition'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'

function Map() {
  const { cities } = useCities()
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation()
  const [mapPosition, setMapPosition] = useState([40.46635901755316, -3.713378906250000])
  const [mapLat, mapLng] = useUrlPosition()

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng])
      }
    }, [mapLat, mapLng]
  )

  useEffect(
    function() {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
      }
    }, [geolocationPosition]
  )

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Get  your position'}
      </Button>}
      <MapContainer 
        className={styles.map} 
        center={mapPosition} 
        zoom={6} 
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
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div> 
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
  return null
}

export default Map