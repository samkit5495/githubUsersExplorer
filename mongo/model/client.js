var mongoose = require('mongoose'),
	modelName = 'client',
	schemaDefinition = require('../schema/' + modelName),
	schemaInstance = mongoose.Schema(schemaDefinition),
	modelInstance = mongoose.model(modelName, schemaInstance);

module.exports = modelInstance;


module.exports.insertClient = (client) => {
  return new Promise((resolve, reject)=>{
    new modelInstance(client).save((error, res) => {
      if(error)
        reject(error);
      else
        resolve(res);
    });
  });
};
