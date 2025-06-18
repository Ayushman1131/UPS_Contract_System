const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
}, { collection: 'mydb' });;

module.exports = mongoose.model('User', userSchema);
