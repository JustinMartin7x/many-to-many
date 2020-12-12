const fs = require('fs');
const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const Library = require('../lib/models/Library');
const Books = require('../lib/models/Books')
const  request  = require('supertest');
const { response } = require('express')

describe('books routes', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./setup.sql', 'utf-8'));
      });
    afterAll(() => {
      return pool.end();
    });
  
    it('should create a books using POST', async() => {
      const res = await request(app)
        .post('/books')
        .send({ title: 'Harry Potter' });
  
      expect(res.body).toEqual({
        id: '1',
        title: 'Harry Potter' 
      });
    });
  
    it ('should get all books using GET', async() => {
      const books = await Promise.all([
        { title: 'Dune' },
        { title: 'Enders Game' },
        { title: 'The Land' }
      ].map(books => Books.insert(books)));
  
      const res = await request(app)
        .get('/books');
  
      expect(res.body).toEqual(expect.arrayContaining(books));
      expect(res.body).toHaveLength(books.length);
    });
  
    it('should get a books by ID using GET', async() => {
      const books = await Books.insert({ title: '#code' });
  
      const res = await request(app)
        .get(`/books/${books.id}`);
  
      expect(res.body).toEqual(books);
    });
  
    it('should update a books using PUT', async() => {
      const books = await Books.insert({ title: 'Planet of the Apes' });
  
      const res = await request(app)
        .put(`/books/${books.id}`)
        .send({ title: 'The Land' });
  
      expect(res.body).toEqual({
        id: books.id,
        title: 'The Land' 
      });
    });
  
    it('should delete a book by id', async() => {
      const books = await Books.insert({ title: 'Gods Eye' });
  
      const res = await request(app)
        .delete(`/books/${books.id}`);
  
      expect(res.body).toEqual(books);
    });
  
  });

