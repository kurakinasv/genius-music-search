const fetch = require('node-fetch');

const { API_BASE_URL, REQUEST_TYPES, OPTIONS } = require('./config/config');
const { formatResponse, formatMessageResponse } = require('./utils');

exports.handler = async (event) => {
  try {
    const perPage = event.queryStringParameters.per_page;
    const page = event.queryStringParameters.page;
    const query = event.queryStringParameters.q;

    const url =
      API_BASE_URL +
      REQUEST_TYPES.SEARCH +
      query +
      `&per_page=${perPage}` +
      `&page=${page}`;

    const response = await fetch(url, OPTIONS);
    const data = await response.json();

    if (!data) {
      throw new Error('No search data');
    }

    return formatResponse(200, data.response.hits);
  } catch (e) {
    formatMessageResponse(400, `Error while search request: ${e.message}`);
  }
};
