import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/CitiesContext'

function CountryList() {
    const { cities, isLoading } = useCities()

    const countries = cities.reduce((arr, city) => {
        if(!arr.map((el) => el.country).includes(city.country)) {
            return [...arr, {country: city.country, emoji: city.emoji}]
        }   
        else return arr
    }, [])

    if(isLoading) return <Spinner />

    if(!cities.length) return <Message message="Add your first city to see the countries!"/>
   
    return (
        <ul className={styles.countryList}>
           {countries.map(country => {
                return <CountryItem key={country.id} country={country} />
           })}
        </ul>
    )
}

export default CountryList