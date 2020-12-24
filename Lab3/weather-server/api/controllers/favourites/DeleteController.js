/**
 * DeleteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  fn: async (req, res) => {
    const id = req.param('id');
    console.log('Searching for city with city_id:' + id);
    const city = await Favourites.find({where: {cityID: id}});
    console.log('Found city:' + city);
    if (city.length !== 0 ) {
      console.log('Deleting city');
      await Favourites.destroy({where: {cityID: id}});
      console.log('Destroyed');
      return res.send({
        cod: 200
      });
    } else {
      console.log('No city to destroy');
      return res.send({
        cod: 304
      });
    }
  }
};


