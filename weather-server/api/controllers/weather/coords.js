//const fetch = require('node-fetch');

module.exports = {

  friendlyName: 'Coordinates',

  description: 'Coordinates weather.',

  inputs: {
    lat: {
      description: 'Latitude',
      type: 'number',
      required: true
    },
    lon: {
      description: 'Longitude',
      type: 'number',
      required: true
    }
  },

  exists: {

  }

  fn: async function ({ lat, lon }) {
    sails.log.info(`Quering weather by coordinates with lat=${lat}, lon=${lon}`);
    const fetchoutput = {
      clouds: {all: 90},
      coord: {lon: 30.37, lat: 59.92},
      main: {temp: 286.16, pressure: 1015, humidity: 93},
      weather: [
        {id: 804, main: "Clouds", description: "overcast clouds", icon: "04n"}
      ],
      name: "Smolenskoye",
      wind: {speed: 2, deg: 120},
      cod: 200
    }
    return fetchoutput;

    //const baseUrl = sails.config.weatherApi.baseUrl;
    //const apiKey = sails.config.weatherApi.key;

   // let response;
   //  try {
   //  //  response = await fetch(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
   //  } catch (error) {
   //    sails.log.warn(`Unable to fetch weather: ${error.message}`);
   //    return exits.unableToFetchWeather();
   //  }
   //
   //  if (response.status != 200) {
   //    sails.log.warn(`Unexpected non-ok weather request status: ${error.message}`);
   //    return exits.unableToFetchWeather();
   //  }
   //
   //  const data = await response.json();
   //  const result = await sails.helpers.parseWeatherData(data);
   //  return exits.success(result);
  }
};
