const { formatMessageResponse } = require('./utils');

exports.handler = async (event) => {
  const query = event.queryStringParameters.q || '';
  return formatMessageResponse(200, `echo route ${query}`);
};
