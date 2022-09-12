const { strict } = require('assert');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  userId:{
    type: String,
    required: true
  }
},{timestamps: true});

module.exports = mongoose.model('Income', incomeSchema);