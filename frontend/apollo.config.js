require('dotenv').config();

module.exports = {
  client: {
    service: {
      name: 'slackify-service-private',
      url: process.env.API_URL,
    },
  },
};
