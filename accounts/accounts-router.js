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
  const id = req.params.id;

  db.select('*')
    .from('accounts')
    .where({ id })
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
router.post('/', (req, res) => {
  const accountDetails = req.body;

  db('accounts')
    .insert(accountDetails, 'id')
    .then(ids => {
      // return getById(ids[0])
      const id = ids[0];

      return db('accounts')
        .where({ id })
        .first()
        .then(inserted => {
        res.status(201).json(inserted);
      })
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error posting a new account', error })
    })
})

// edit account 
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  
  db('accounts')
    .where({ id }) 
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error updating the account info', error })
    })
});

// delete account
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db('accounts')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'Error deleting that account', error })
    })
})

// function getById(id) {
//   return db('accounts')
//     .where({ id })
//     .first();
// }

module.exports = router;
