const express = require('express');

const api = express();

api.get('/', (_req, res) => {
  res.status(200).send();
})

api.listen('2035', () => {
  console.log('Back-end online!');
});