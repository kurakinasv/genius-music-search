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

    const url = API_BASE_URL + REQUEST_TYPES.SONGS + query + TEXT_FORMAT;

    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    if (!data) {
      throw new Error('No song data');
    }

    return formatResponse(200, data.response.song);
  } catch (e) {
    return formatMessageResponse(400, `Error while song request: ${e.message}`);
  }
};
