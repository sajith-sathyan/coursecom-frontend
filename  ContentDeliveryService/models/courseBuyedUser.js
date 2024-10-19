const mongoose = require('mongoose');

const courseBuyedUserSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  courseIdArray: { 
    type: [String],
    default: [] 
  }
});

const CourseBuyedUser = mongoose.model('CourseBuyedUser', courseBuyedUserSchema);

module.exports = CourseBuyedUser;
