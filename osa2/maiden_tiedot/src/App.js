import {useState} from 'react';
import countryService from './service/countries';
import CountryList from './components/countryList';
import weatherService from './service/weather';

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY

  const [country, setCountry] = useState('');
  const [possibleCountries, setPossibleCountries] = useState(null);
  const [countryToShow, setCountryToShow] = useState(null);
  const [capitalWeather, setCapitalWeather] = useState(null)

  const changeCountryToShow = country => {
    setCountryToShow(country)
    if (country)
      fetchCapitalWeather(country)
    else
      setCapitalWeather(null)
  }

  const handleCountryChange = event => {
    const newCountryField = event.target.value;
    setCountry(newCountryField);
    console.log('Updating possible countries.')
    countryService.getAll()
    .then(countryData => {
      const possibleCountries = countryData.filter(country => 
        country.name.common.toLowerCase().includes(newCountryField.toLowerCase())
      )
      setPossibleCountries(possibleCountries)
      if (possibleCountries.length === 1) {
        const country = possibleCountries[0]
        changeCountryToShow(country)
      }
      else {
      changeCountryToShow(null)
      }
    })
  }
  const handleShortcut = country => {
    console.log('Fetching data for spesific country.')
    countryService.get(country.name.common)
    .then(countryData => {
      changeCountryToShow(countryData)
    })
  }
  const fetchCapitalWeather = country => {
    console.log('Fetching capital weather for ', country)
    weatherService
    .getCapitalWeather(country, api_key)
    .then(weatherData => {
      console.log('got weatherdata', weatherData)
      setCapitalWeather(weatherData)
    })
  }
  return (
    <div> 
      <form>
        <div> find countries <input value={country} onChange={handleCountryChange} /> </div>
      </form>
      <CountryList possibleCountries={possibleCountries} handleShortcut={handleShortcut}
        countryToShow={countryToShow} weather={capitalWeather} />
     </div>
  );
}

export default App;
