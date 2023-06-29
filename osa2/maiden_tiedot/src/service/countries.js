import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries';

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`);
  return request.then(response => response.data);
}
const get = (country) => {
    const request = axios.get(`${baseUrl}/api/name/${country}`);
    return request.then(response => response.data);
}

const countryService = {
    getAll,
    get
};

export default countryService;