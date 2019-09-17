const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session) /// after session only

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const dbConnection = require('../database/dbConfig.js')

const server = express();

const sessionConfig = {
  name: 'chocochip', 
    secret:'keep it secrect',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
      knex: dbConnection,
      tablename: 'knexsession',
      sidfielname: 'sessionid',
      createtable: true,
      clearInterval: 1000 * 60 * 30,
    })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
