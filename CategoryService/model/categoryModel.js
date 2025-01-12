const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  CategoryArray: {
    type: [String], 
    unique: true 
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
