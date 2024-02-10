import axios from "axios";
// import dotenv from 'dotenv'
// dotenv.config()

const BASE_URL = "https://youtube-v31.p.rapidapi.com";
const options = {
  url: BASE_URL,
  params: {
    maxResults: "50"
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY || "7e6687a80amshe044a8ca0e5b265p139335jsnfd60e833fa4e",
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  }
};

const fetchFromApi = async (url) => {
  const data = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

export default fetchFromApi;
