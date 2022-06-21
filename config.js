require('dotenv').config();

const config = {
  BASE_URL: 'https://genius.p.rapidapi.com/',

  OPTIONS: {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'genius.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    },
  },

  PLAIN: '?text_format=html',

  REQUEST_TYPES:{
    SEARCH: 'search?q=',
    SONGS: 'songs/',
    ARTISTS: 'artists/',
  }
};

module.exports = config;
