const mongoose = require('mongoose');

/**
 * Configuration.
 */

const clientModel = require('./mongo/model/client'),
  tokenModel = require('./mongo/model/token'),
  userModel = require('./mongo/model/user');

/*
 * Get access token.
 */

var getAccessToken = (bearerToken, callback) => {
  tokenModel.findOne({
    accessToken: bearerToken
  }, callback);
};

/**
 * Get client.
 */

var getClient = (clientId, clientSecret, callback) => {

  clientModel.findOne({
    clientId: clientId,
    clientSecret: clientSecret
  }, callback);
};

/**
 * Grant type allowed.
 */

var grantTypeAllowed = (clientId, grantType, callback) => {

  callback(false, grantType === "password");
};

/**
 * Save token.
 */

var saveAccessToken = (accessToken, clientId, expires, user, callback) => {

  var token = new tokenModel({
    accessToken: accessToken,
    expires: expires,
    clientId: clientId,
    user: user
  });

  token.save(callback);
};

/*
 * Get user.
 */

var getUser = (username, password, callback) => {

  userModel.findOne({
    username: username,
    password: password
  }, callback);
};

/**
 * Export model definition object.
 */

module.exports = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  grantTypeAllowed: grantTypeAllowed,
  saveAccessToken: saveAccessToken,
  getUser: getUser
};
