// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const oauthserver = require('oauth2-server');

//DB connection
mongoose.connect(config.database, { useMongoClient: true });
mongoose.Promise = global.Promise;

//On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

//On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

//Get our API routes
let githubUser = require('./routes/githubUser');
let user = require('./routes/user');

const port = process.env.PORT || '3000';

// CORS Middleware
app.use(cors());

// Parsers for POST data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if(req.headers['content-type'] === 'application/x-www-form-urlencoded') req.body = req.query;
  return next();
});

app.oauth = oauthserver({
  model: require('./models.js'),
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.use(app.oauth.errorHandler());

// Point static path to dist
app.use('', express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api/githubUser', app.oauth.authorise(), githubUser);
app.use('/api/user', user);

// Catch all other routes and return the index file

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port, () => console.log(`API running on localhost:${port}`));
