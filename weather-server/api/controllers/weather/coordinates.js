/**
 * CoordsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = async function getWeather (req, res) {

  const lat = req.param('lat');
  const lon = req.param('lon');
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
  return res.ok()

}

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
    success: {
      statusCode: 200
    },
    unableToFetchWeather: {
      statusCode: 500
      response
    }
  },

  fn: function (inputs, exits) {
    sails.log.info(`Quering weather by coordinates with lat=${inputs.lat}, lon=${inputs.lon}`);
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

