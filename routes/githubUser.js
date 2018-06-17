const express = require('express');
const router = express.Router();

const GithubUserModel = require("../mongo/model/githubUser");

router.post('/dumpUserData', function (req, response, next) {
  let user = req.body;
  GithubUserModel.getUser(user.login)
    .then(res=>{
      GithubUserModel.updateUser(user)
        .then(res=>{
          response.json({success: true, data:res});
        })
        .catch(res=>{
          response.json({success: false, data:res});
        });
    })
    .catch(res=>{
      GithubUserModel.insertUser(user)
        .then(res=>{
          response.json({success: true, data:res});
        })
        .catch(res=>{
          response.json({success: false, data:res});
        });
    });
});

router.get('/getTopUsersByFollowers', function (req, res, next) {
  GithubUserModel.find().sort({'followers': -1}).limit(10).exec((error,data)=>{
    if(error)
      res.json({success:false,error:error});
    else
      res.json({success:true,data:data});
  });
});

module.exports = router;
