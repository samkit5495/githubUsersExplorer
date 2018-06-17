var mongoose = require('mongoose'),
  modelName = 'githubUser',
  schemaDefinition = require('../schema/' + modelName),
  schemaInstance = mongoose.Schema(schemaDefinition),
  modelInstance = mongoose.model(modelName, schemaInstance);

module.exports = modelInstance;

module.exports.insertUser = (user) => {
  return new Promise((resolve, reject)=>{
    new modelInstance(user).save((error, res) => {
      if(error)
        reject(error);
      else
        resolve(res);
    });
  });
};

module.exports.updateUser = (user) => {
  return new Promise((resolve, reject)=>{
    modelInstance.update({login:user.login},user,{},(error, res) => {
      if(error)
        reject(error);
      else
        resolve(res);
    });
  });
};

module.exports.getUser = (login) => {
  return new Promise((resolve, reject)=>{
    modelInstance.findOne({login:login},(error, res) => {
      if(error)
        reject(error);
      else if(!res)
        reject(res);
      else
        resolve(res);
    });
  });
};
