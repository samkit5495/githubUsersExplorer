const express = require('express');
const router = express.Router();

const UserModel = require("../mongo/model/user");
const ClientModel = require("../mongo/model/client");

router.post('/register', function (req, response, next) {
  let user = req.body;
  UserModel.getUser(user.username)
    .then(res => {
      response.json({success: false, message: 'User Already Exists'});
    })
    .catch(res => {
      UserModel.insertUser(user)
        .then(res => {
          return ClientModel.insertClient({
            clientId: res._id,
            clientSecret: 'secret'
          });
        })
        .then(res => {
          response.json({success: true, data: res});
        })
        .catch(res => {
          response.json({success: false, data: res});
        });
    });
});

router.post('/getClientId', function (req, response, next) {
  let user = req.body;
  UserModel.getUser(user.username)
    .then(res => {
      response.json(res._id);
    })
    .catch(error => {
      response.json(error);
    });
});


module.exports = router;
