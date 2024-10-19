import course from "../../../src/entities/course.js";

export default function updateById(
  id,
  userId,
  courseTitle,
  description,
  thumbnailImg,
  videoFiles,
  createdAt,
  status,
  courseRepository
) {
  // add proper validation
  if (!courseTitle) {
    throw new Error("courseTitle fields cannot be empty");
  }
  if (!description) {
    throw new Error("description fields cannot be empty");
  }
  if (!thumbnailImg) {
    throw new Error("thumbnailImg fields cannot be empty");
  }
  if (!videoFiles) {
    throw new Error("videoFiles fields cannot be empty");
  }
  if (!userId) {
    throw new Error("userId fields cannot be empty");
  }


  const updatedCourse = {
    courseTitle,
    description,
    thumbnailImg,
    videoFiles,
    userId,
    status,
    createdAt,
  };

  return courseRepository.findById(id).then((foundCourse) => {
    if (!foundCourse) {
      throw new Error(`No course found with id: ${id}`);
    }
    
    foundCourse.courseTitle = updatedCourse.courseTitle;
    foundCourse.description = updatedCourse.description;
    foundCourse.thumbnailImg = updatedCourse.thumbnailImg;
    foundCourse.videoFiles = updatedCourse.videoFiles;
    foundCourse.userId = updatedCourse.userId;
    foundCourse.status = updatedCourse.status
    foundCourse.createdAt = updatedCourse.createdAt;

    // Save the updated document
    return foundCourse.save();
  });
}
