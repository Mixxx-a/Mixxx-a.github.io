/**
 * CoordsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fetch = require('node-fetch');

module.exports = {
  fn: async (req, res) => {
    const lat = req.param('lat');
    const lon = req.param('lon');
    const response = await fetch(sails.config.weatherApi.baseUrl +
      '?lat=' +
      lat +
      '&lon=' +
      lon +
      '&units=%22metric%22', {
      'method': 'GET',
      'headers': sails.config.weatherApi.headers
    });
    if (response.ok)
    {
      const data = await response.json();
      const result = await sails.helpers.wrapData(data);
      return res.send(result);
    }
    else {
      return res.send({
        cod: 404
      });
    }
  }
};


/*module.exports = {

  friendlyName: 'Coordinates Controller',

  description: 'Get weather by coordinates',

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
    },
  },

  exits: {
    unableToFetchWeather: {
      statusCode: 500
    }
  },

  getWeatherByCoords: async function (inputs, exits) {
    const fetchoutput = {
      clouds: {all: 90},
      coord: {lon: 30.37, lat: 59.92},
      main: {temp: 286.16, pressure: 1015, humidity: 93},
      weather: [
        {id: 804, main: 'Clouds', description: 'overcast clouds', icon: '04n'}
      ],
      name: 'Smolenskoye',
      wind: {speed: 2, deg: 120},
      cod: 200
    };
    return exits.success(fetchoutput);
  }

};*/

