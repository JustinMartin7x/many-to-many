const express = require('express');
const Library = require('./models/Library');
const Books = require('./models/Books')
const app = express();

app.use(express.json());


app.post('/library', (req, res, next)  => {
  Library
    .insert(req.body)
    .then(library => res.send(library))
    .catch(next);
});
app.get('/library/:id', (req, res, next) => {
  Library
  .findById(req.params.id)
  .then(library => res.send(library))
  .catch(next)
})
app.put('/library/:id', (req, res, next) => {
  Library
  .update(req.params.id, req.body)
  .then(library => res.send(library))
  .catch(next)
})
app.delete('/library/:id', (req, res, next) => {
  Library
  .remove(req.params.id)
  .then(library => res.send(library))
  .catch(next)
})

//   for the books

app.post('/books', (req, res, next) => {
Books
.insert(req.body)
.then(book => res.send(book))
.catch(next)
})

app.get('/books', (req, res, next) => {
  Books
  .findAll()
  .then(book => res.send(book))
  .catch(next)
})

app.get('/books/:id', (req, res, next) => {
  Books
  .findById(req.params.id)
  .then(library => res.send(library))
  .catch(next)
})

app.put('/books/:id', (req, res, next) => {
  Books
  .update(req.params.id, req.body)
  .then(library => res.send(library))
  .catch(next)
})
app.delete('/books/:id', (req, res, next) => {
  Books
  .delete(req.params.id)
  .then(library => res.send(library))
  .catch(next)
})

module.exports = app;
