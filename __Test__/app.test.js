const fs = require('fs');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Library = require('../lib/models/Library');
const  request  = require('supertest');
const { response } = require('express')




describe('library routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
  it ('should insert a insert a new library usint POST', async() => {
    const response = await request(app)
      .post('/library')
      .send({
        name: 'this one',
        location: 'there'
      });
    expect(response.body).toEqual({
      id: "1",
      name: 'this one',
      location: 'there'
    });
  });

  it ('should get a library by ID using the GET route', async() => {
    const library = await Library.insert({ name: 'this one', location: 'there'});

    const response = await request(app)
    .get(`/library/${library.id}`)
    
    expect(response.body).toEqual(library)
  })
  
  it ('should update an existing library using the update method and the PUT route', async() => {
    const library = await Library.insert({ name: 'this one', location: 'there'});

    const response = await request(app)
    .put(`/library/${library.id}`)
    .send( { name: 'this new one', location: 'over here now' })

    expect(response.body).toEqual({ id: library.id, name: 'this new one', location: 'over here now' })

  })


  it ('should delete a library by id using Delete route', async() => {
    const library = await Library.insert({ name: 'condemed', location: 'not here any more'});

    const response = await request(app)
    .delete(`/library/${library.id}`);

    expect(response.body).toEqual(library)
  })

});
