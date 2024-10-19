// Import the CourseBuyedUser model
const CourseBuyedUser = require("../models/courseBuyedUser");
const userBuyedCourse  = require('../models/userBuyedCourse')
module.exports.courseBuyedUserUpdation = async (req, res) => {
  const { courseId, userId } = req.body;
  try {
    let BuyedUser = await CourseBuyedUser.findOne({ userId });

    if (!BuyedUser) {
      BuyedUser = new CourseBuyedUser({ userId, courseIdArray: [courseId] });
    } else {
      BuyedUser.courseIdArray.push(courseId);
    }

    await BuyedUser.save();

    res.status(200).json({
      success: true,
      message: "Course buyed user updated successfully",
    });
  } catch (error) {
    console.error("Error updating course buyed user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.checkPurchaseStatus = async (req, res) => {
  try {
    const { courseId, userId } = req.body;

    // Find the course document with the given courseId
    const course = await CourseBuyedUser.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the userId exists in the userIdArray of the course document
    const isPurchased = course.userIDArray.includes(userId);

    res.status(200).json({ isPurchased });
  } catch (error) {
    console.error("Error checking purchase status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getCourseById = async (req, res) => {
    try {
        const userId = req.params.id; 
        
        const course = await CourseBuyedUser.findOne({ userId });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ course });
    } catch (error) {
        console.error("Error getting course by userId:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.userBuyedCourseUpdation =async (req,res) =>{
  const { courseId, userId } = req.body;
console.log("userBuyedCourseUpdation called ")
  console.log("courseId, userId--->",courseId, userId)
  try {
    let BuyedCourse = await userBuyedCourse.findOne({ courseId });

    if (!BuyedCourse) {
      BuyedCourse = new userBuyedCourse({ courseId, userIdArray: [userId] });
    } else {
      BuyedCourse.userIdArray.push(userId);
    }

    await BuyedCourse.save();

    res.status(200).json({
      success: true,
      message: "Course buyed user updated successfully",
    });
  } catch (error) {
    console.error("Error updating course buyed user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports.getUserById = async (req, res) => {
  try {
      const courseId = req.params.id; 
      
      const users = await userBuyedCourse.findOne({ courseId });

      if (!users) {
          return res.status(404).json({ message: "Course not found" });
      }

      res.status(200).json({ users });
  } catch (error) {
      console.error("Error getting course by userId:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};