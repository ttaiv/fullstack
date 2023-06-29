import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getCapitalWeather = (country, api_key) => {
    const [lat, lon] = country.capitalInfo.latlng
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then(response => response.data);
}

const weatherService = {
    getCapitalWeather
};

export default weatherService;