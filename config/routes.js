const axios = require('axios');
require('dotenv').config()

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
  const secret = process.env.JWT_SECRET

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secret.jwtSecret, options)
}

function register(req, res) {
  // implement user registration
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  const token = generateToken(user)
  Users.insert(user)
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
  const { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then(user => {
      const token = generateToke(user)
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token
        })
      } else {
        res.status(401).json({ message: 'Your login information is not correct.' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
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
