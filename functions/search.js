const fetch = require('node-fetch');
const { API_BASE_URL, REQUEST_TYPES, OPTIONS } = require("./config/config");

exports.handler = async (event) => {
    try {
        const perPage = event.queryStringParameters.per_page
        const page = event.queryStringParameters.page
        const query = event.queryStringParameters.q

        const url =
            API_BASE_URL +
            REQUEST_TYPES.SEARCH +
            query +
            `&per_page=${perPage}` +
            `&page=${page}`;

        const response = await fetch(url, OPTIONS);
        const data = await response.json();

        return { statusCode: 200, body: JSON.stringify(data.response.hits) }
    } catch (e) {
        return { statusCode: 400, body: JSON.stringify({ message: `Error while search request: ${e.message}` }) }
    }
}