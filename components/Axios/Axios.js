import axios from 'axios';
const API_KEY = '9c933ed4-86906d83-90d4fc13-0b42abe3';
const Axios = axios.create({
  baseURL: 'https://fortniteapi.io/',
  headers: {Authorization: API_KEY},
});

export default Axios;
