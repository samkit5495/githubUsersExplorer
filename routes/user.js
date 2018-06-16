const express = require('express');
const router = express.Router();

const utils = require('../models/utils');
const User = require("../models/user");

router.post('/add', function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  User.emailNotExists(email)
    .then(function () {
      return utils.genSalt(10);
    })
    .then(function (salt) {
      return utils.hash(password, salt);
    })
    .then(function (hash) {
      return User.addUser(name, email, hash);
    })
    .then(function (result) {
      res.json({success: true, result: result});
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.post('/authenticate', function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  User.getUserByEmail(email)
    .then(function (user) {
      return User.comparePassword(password, user.password);
    })
    .then(function (result) {
      res.json({success: true, result: result});
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.get('/get/:id', function (req, res, next) {
  let id = req.params.id;
  User.getUser(id)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.get('/delete/:id', function (req, res, next) {
  let id = req.params.id;
  User.deleteUser(id)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.post('/update/:id', function (req, res, next) {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  User.emailNotExists(email)
    .then(function () {
      return User.getUser(id);
    })
    .then(function (user) {
      return User.updateUser(user, name, email);
    })
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.get('/getAll', function (req, res, next) {
  User.getAllUsers()
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.post('/changePassword/:id', function (req, res, next) {
  let id = req.params.id;
  let password = req.body.password;
  let user = null;
  User.getUser(id)
    .then(function (result) {
      user = result;
      return utils.genSalt(10);
    })
    .then(function (salt) {
      return utils.hash(password, salt);
    })
    .then(function (hash) {
      return User.changePassword(user, hash);
    })
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});


module.exports = router;
