const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlackListSchema = new Schema({
  token: String,
  createdAt: {type: Date, default: Date.now, expires: 86400}
});

const BlackList = mongoose.model('blackList', BlackListSchema);

module.exports = BlackList;
