const express = require('express');

const cors = require('cors');
const loginRouter = require('./src/loginRouter');
const signRouter = require('./src/signUpRouter');
const taskRouter = require('./src/taskRouter');

const api = express();
api.use(express.json());
api.use(cors()); // para aceitar req de outras aolicações

api.get('/', (_req, res) => {
  res.status(200).send();
})

api.use('/', loginRouter);
api.use('/', signRouter);
api.use('/', taskRouter);

api.listen('2035', () => {
  console.log('Back-end online!');
});