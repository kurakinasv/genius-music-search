const config = {
  BASE_URL: 'https://api.genius.com/',

  OPTIONS: {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  },

  TEXT_FORMAT: '?text_format=html',

  REQUEST_TYPES: {
    SEARCH: 'search?q=',
    SONGS: 'songs/',
    ARTISTS: 'artists/',
  },
};

module.exports = config;
