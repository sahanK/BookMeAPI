const NodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER_MAPQUEST,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY_MAPQUEST,
    formatter: null 
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;