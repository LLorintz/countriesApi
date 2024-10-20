import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { CountryType } from "../Allcountries/AllCountries"

const CountryInfo = () => {

  const [country, setCountry] = useState<CountryType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const{countryName} = useParams()

  const getCountryByName = async()=>{
    try{
      if (!countryName) {
        throw new Error("Country name is missing!");
      }
      const response = await fetch('https://restcountries.com/v3.1/name/'+countryName)
      if (!response.ok) {
        throw new Error('Could not found!')
      }
      const data:CountryType[] = await response.json()
      setCountry(data)
      setIsLoading(false)
    }catch(error){
      setIsLoading(false)
      setError('failed to Fetch')
      console.error('hiba:' + error)
    }
  }

  useEffect(() => {
    getCountryByName()
  
  }, [countryName])
  

  return (
    <div className="countryInfoWrapper">
      <button><Link to='/'>Back</Link></button>
      {
        isLoading && !error && <h4>Loading ...</h4>
      }
      
        {
          country?.map((country,index)=>(
            <div className="countryInfoContainer" key={index}>
                <div className="countryInfoImg">
                  <img src={country.flags.svg} alt="" />
                </div>
                <div className="countryInfo">
                  <div className="countryInfoLeft">
                    <h5>Native Name: <span>{country.name.common}</span></h5>
                    <h5>Population: <span>{country.population}</span></h5>
                    <h5>Region: <span>{country.region}</span></h5>
                    <h5>Capital: <span>{country.capital}</span></h5>
                  </div>
                </div>
            </div>
          ))
        }
      
    </div>
  )
}

export default CountryInfo