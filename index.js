const path = require('path');

const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');

const { BASE_URL, OPTIONS, TEXT_FORMAT, REQUEST_TYPES } = require('./config');
const PORT = process.env.PORT | 5000;
require('dotenv').config();

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

app.get('/search', async (req, res) => {
  try {
    const url = BASE_URL + REQUEST_TYPES.SEARCH + req.query.q;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    res.json(data.response.hits);
  } catch (e) {
    res
      .status(400)
      .json({ message: `Error while search request: ${e.message}` });
  }
});

app.get('/song', async (req, res) => {
  try {
    const url = BASE_URL + REQUEST_TYPES.SONGS + req.query.q + TEXT_FORMAT;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    res.json(data.response.song);
  } catch (e) {
    res.status(400).json({ message: `Error while song request: ${e.message}` });
  }
});

app.get('/artist', async (req, res) => {
  try {
    const url = BASE_URL + REQUEST_TYPES.ARTISTS + req.query.q + TEXT_FORMAT;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    res.json(data.response.artist);
  } catch (e) {
    res
      .status(400)
      .json({ message: `Error while artist request: ${e.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
