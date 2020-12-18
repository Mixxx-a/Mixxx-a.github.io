/**
 * GetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async (req, res) => {
    const name = req.param(req);
    if (name === undefined) {
      const cities = await Favourites.find();
      console.log('Cities:' + cities);
      let result = [];
      for (let i = 0; i < cities.length; i++) {
        result.push(cities[i].cityName);
      }
      return res.send(result);
    } else {
      const cityName = await sails.helpers.formatName(name);
      const city = await Favourites.find({where: {cityName: cityName}});
      if (city.length !== 0) {
        return res.send({
          cod: 409
        });
      } else {
        return res.send({
          cod: 200
        });
      }
    }
  }
};


