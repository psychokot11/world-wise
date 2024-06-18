import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'http://localhost:5000'

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
  
    useEffect(() => {
      async function fetchCities() {
        try {
          setIsLoading(true)
          const res = await fetch(`${BASE_URL}/cities`)
          const data = await res.json()
          setCities(data)
        }
        catch {
          console.log('Error fetching cities')
        }
        finally {
          setIsLoading(false)
        }
  
      }
      fetchCities()
    }, [])

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading
        }}>
            { children }
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) {
        throw new Error("CitiesContext was used outside of the CitiesProvider")
    }
    return context
}

export { CitiesProvider, useCities }