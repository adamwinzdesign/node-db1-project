const express = require('express');

const accountsRouter = require('./accounts/accounts-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h1>Welcome to the knex challenge!</h1>')
})

server.use('/api/accounts', accountsRouter);

module.exports = server;
