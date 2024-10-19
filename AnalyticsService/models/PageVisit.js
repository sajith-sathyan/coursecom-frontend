// models/PageVisit.js

const mongoose = require('mongoose');

const PageVisitSchema = new mongoose.Schema({
  label: String,
  count: { type: Number, default: 0 }
});

const PageVisit = mongoose.model('PageVisit', PageVisitSchema);
  
module.exports = PageVisit;
