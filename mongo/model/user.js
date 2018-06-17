var mongoose = require('mongoose'),
	modelName = 'user',
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

module.exports.getUser = (username) => {
  return new Promise((resolve, reject)=>{
    modelInstance.findOne({username:username},(error, res) => {
      if(error)
        reject(error);
      else if(!res)
        reject(res);
      else
        resolve(res);
    });
  });
};

