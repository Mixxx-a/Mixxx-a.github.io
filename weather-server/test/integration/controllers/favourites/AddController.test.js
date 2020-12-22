const supertest = require('supertest');

describe('AddController', () => {
  it('Should add cities correctly', () => {
    supertest(sails.hooks.http.app)
      .post('/favourites')
      .send({ name: 'London', id: 12345678})
      .expect(200);
  });
});
