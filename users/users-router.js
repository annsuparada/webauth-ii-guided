const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(error => {
      if(error) {
        res.status(500).json({ message: 'can not log out'})
      } else {
        res.status(200).json({ message: 'bye'})
      }
    });
  } else {
    res.status(200).json({ message: 'Already logged out'})
  }
})

module.exports = router;
