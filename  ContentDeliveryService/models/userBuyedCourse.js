const mongoose = require('mongoose');

const userBuyedCourseSchema = new mongoose.Schema({
    courseId: {
    type: String
  },
  userIdArray: { 
    type: [String],
    default: [] 
  }
});

const userBuyedCourse = mongoose.model('userBuyedCourseSchema', userBuyedCourseSchema);

module.exports = userBuyedCourse;
