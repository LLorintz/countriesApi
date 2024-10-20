import { useEffect, useState } from "react"
import { apiURL } from "../../api/api"
import Search from "../Search/Search";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";

export type CountryType = {
    name: {
      common: string;
    };
    population: number;
    region: string;
    capital: string;
    flags: {
      svg: string;
    };
  };


const AllCountries = () => {

  const [countries, setCountres] = useState<CountryType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error,setError] =useState('')

  const fetAllCountries = async()=>{
    try{
        const response = await fetch(apiURL)
        if (!response.ok) {
            throw new Error('Sg went wrong')
        }
        const data: CountryType[] = await response.json()
        console.log(data)
        setCountres(data)
        setIsLoading(false)
    }catch(error){
        setIsLoading(false)
        setError('failed to Fetch')
        console.error('hiba:' + error)
    }
  }

  useEffect(()=>{
    fetAllCountries()
  },[])

  const getCountryByName = async(countryName:string)=>{
    try{
        setIsLoading(true);
        setError('')
        const resposne = await fetch('https://restcountries.com/v3.1/name/'+countryName)
        if (!resposne.ok) {
            throw new Error('country not found!');
        }
        const data = await resposne.json()
        setCountres(data)
        setIsLoading(false)}
        catch(error)
        {
            setIsLoading(true)
            setError('failed to search')
            console.error('error: ', error)
        }
  }

  const getCountryByRegion = async (regionName:string)=>{
    try{
        setIsLoading(true);
        setError('')
        const resposne = await fetch('https://restcountries.com/v3.1/region/'+regionName)
        if (!resposne.ok) {
            throw new Error('country not found!');
        }
        const data = await resposne.json()
        setCountres(data)
        setIsLoading(false)}
        catch(error)
        {
            setIsLoading(true)
            setError('failed to search')
            console.error('error: ', error)
        }
  }

  return (
    <div className="allCountry">
        <div className="countryTop">
            <div className="search">
                <Search onsearch={getCountryByName}></Search>
            </div>
            <div className="filter">
                <Filter onSelect={getCountryByRegion}></Filter>
            </div>
        </div>
        <div className="countryBottom">
            {isLoading && !error && <h4>Loading...</h4>}
            {error &&! isLoading && <h4>{error}</h4>}
            {
                countries.map(country=>(
                    <Link to={'/country/' + country.name.common}>
                        <div className="countryCard" key={country.name.common}>
                            <div className="countryImage">
                                <img src={country.flags.svg} alt="" />
                            </div>
                            <div className="countryData">
                                <h3>{country.name.common}</h3>
                                <h6>Population: {country.population}</h6>
                                <h6>Region: {country.region}</h6>
                                <h6>Capital: {country.capital}</h6>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default AllCountries