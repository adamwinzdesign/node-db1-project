const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

// get all accounts
router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error getting all accounts.', error })
    })
});

// get account by id
router.get('/:id', (req, res) => {
  db.select('*')
    .from('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account)
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error getting account by ID', error })
    })
})

// post new account
// name and budget
// error even if successful???
router.post('/', (req, res) => {
  const accountDetails = req.body;

  db('accounts')
    .insert(accountDetails, 'id')
    .then(ids => {
      return getById(ids[0])
      .then(inserted => {
        res.status(201).json(inserted);
      })
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error posting a new account', error })
    })
})


module.exports = router;
