const fetch = require('node-fetch');

const {
  API_BASE_URL,
  REQUEST_TYPES,
  OPTIONS,
  TEXT_FORMAT,
} = require('./config/config');
const { formatResponse, formatMessageResponse } = require('./utils');

exports.handler = async (event) => {
  try {
    const query = event.queryStringParameters.q;

    const url = API_BASE_URL + REQUEST_TYPES.ARTISTS + query + TEXT_FORMAT;

    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    if (!data) {
      throw new Error('No artist data');
    }

    return formatResponse(200, data.response.artist);
  } catch (e) {
    return formatMessageResponse(
      400,
      `Error while artist request: ${e.message}`
    );
  }
};
