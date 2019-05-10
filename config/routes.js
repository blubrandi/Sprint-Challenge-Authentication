const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
const db = require('../database/dbConfig.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    userID: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

function register(req, res) {
  // implement user registration
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  const token = generateToken(user)
  Users.add(user)
    .then(saved => {
      saved.token = token
      res.status(201).json(saved)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
