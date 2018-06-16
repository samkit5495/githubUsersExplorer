let url = 'mongodb://localhost:27017/dbgithubusers';
if (process.env.MONGODB_URI)
  url = process.env.MONGODB_URI;

module.exports = {
  database: url,
  secret: 'yoursecret'
};
