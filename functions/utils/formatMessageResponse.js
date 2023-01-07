const formatResponse = require('./formatResponse');

module.exports = (statusCode, message) => {
  formatResponse(statusCode, message);
};
