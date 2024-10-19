import course from "../../../src/entities/course.js";

export default function addCourse(
  title,
  price,
  category,
  description,
  thumbnailUrl,
  videos,
  userId,
  createdAt,

  courseRepository
) {
  //  add a proper validation
  if (!title) {
    throw new Error("title fields cannot be empty");
  }
  if (!price) {
    throw new Error("price fields cannot be empty");
  }
  if (!category) {
    throw new Error("category fields cannot be empty");
  }
  if (!thumbnailUrl) {
    throw new Error("thumbnailUrl fields cannot be empty");
  }
  if (!videos) {
    throw new Error("videos fields cannot be empty");
  }
  if (!userId) {
    throw new Error("userId fields cannot be empty");
  }
  if (!createdAt) {
    throw new Error("createdAt fields cannot be empty");
  }

  const newCourse = course(
    title,
    price,
    category,
    description,
    thumbnailUrl,
    videos,
    userId,
    createdAt
  );

  return courseRepository.addCourse(newCourse);
}
