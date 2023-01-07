const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const serverless = require('serverless-http');

const {
  API_BASE_URL,
  OPTIONS,
  TEXT_FORMAT,
  REQUEST_TYPES,
} = require('../../config');
// const PORT = process.env.PORT || 5000;

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

router.get('/', (req, res) => {
  res.send('echo route');
});

router.get('/search', async (req, res) => {
  try {
    const url =
      API_BASE_URL +
      REQUEST_TYPES.SEARCH +
      req.query.q +
      `&per_page=${req.query.per_page}` +
      `&page=${req.query.page}`;

    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    res.json(data.response.hits);
  } catch (e) {
    res
      .status(400)
      .json({ message: `Error while search request: ${e.message}` });
  }
});

router.get('/song', async (req, res) => {
  try {
    const url = API_BASE_URL + REQUEST_TYPES.SONGS + req.query.q + TEXT_FORMAT;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    res.json(data.response.song);
  } catch (e) {
    res.status(400).json({ message: `Error while song request: ${e.message}` });
  }
});

router.get('/artist', async (req, res) => {
  try {
    const url =
      API_BASE_URL + REQUEST_TYPES.ARTISTS + req.query.q + TEXT_FORMAT;
    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    res.json(data.response.artist);
  } catch (e) {
    res
      .status(400)
      .json({ message: `Error while artist request: ${e.message}` });
  }
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
