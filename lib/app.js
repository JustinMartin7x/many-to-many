const express = require('express');
const Library = require('./models/Library');
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

module.exports = app;
