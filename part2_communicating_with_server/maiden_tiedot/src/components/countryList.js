const CapitalWeather = ({country, weather}) => {
  console.log('rendering weather', weather)
  return (
    <div>
      <h3> Weather in {country.capital} </h3>
      <p> 
        temperature {weather.main.temp} Celcius <br></br> 
        wind {weather.wind.speed} m/s
      </p>
    </div>
  )
}

const CountryInfo = ({country}) => (
    <div>
      <h2> {country.name.common} </h2>
      <p> 
        capital {country.capital} <br></br> 
        area {country.area}
      </p>
      <h3> Languages </h3>
      <ul>
        {Object.values(country.languages).map(language => 
          <li key={language}> {language} </li>
        )}
      </ul>
      <p>
        <img src={country.flags.png} alt={country.flags.alt} />
      </p>
    </div>
)

const CountryList  = ({possibleCountries, handleShortcut, countryToShow, weather}) => {
  if (countryToShow && weather) // one country
    return (
      <div>
        <CountryInfo country={countryToShow} />
        <CapitalWeather country={countryToShow} weather={weather}  />
      </div>
    );
  else if (!possibleCountries || possibleCountries.length === 0)
    return null;
  else if (possibleCountries.length > 10)
    return (
      <>
      <p> Too many matches. Specify more. </p>
      </>
    );
  else  // 1 < possibleCountries.length <= 10
    return (
      <div> <br></br>
        {possibleCountries.map(country => 
          <span 
            key={country.name.common}> {country.name.common} {' '} 
            <button onClick={() => handleShortcut(country)}> Show </button> <br></br> 
          </span>
        )}
      </div>
    );
}

export default CountryList