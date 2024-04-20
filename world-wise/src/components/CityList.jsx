/* eslint-disable react/prop-types */
import Spinner from './Spinner'
import Message from './Message'
import styles from './CityList.module.css'
import CityItem from './CityItem'

function CityList({ cities, isLoading }) {
    if(isLoading) return <Spinner />
    if(!cities.length) return <Message />
    return (
        <ul className={styles.cityList}>
           {cities.map(city => {
                return <CityItem key={city.id} city={city} />
           })}
        </ul>
    )
}

export default CityList