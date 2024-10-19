import addCourse from "../../application/use_cases/course/add.js";
import findById from "../../application/use_cases/course/findById.js";
import updateById from "../../application/use_cases/course/updateById.js";
import deleteById from "../../application/use_cases/course/deleteΒyId.js";
import findByUserId from "../../application/use_cases/course/findByUserId.js";
import findAll from "../../application/use_cases/course/findAll.js";
import findByIds from "../../application/use_cases/course/findByIds.js";
export default function courseController(
  courseDbRepository,
  courseDbRepositoryImpl
) {
  const dbRepository = courseDbRepository(courseDbRepositoryImpl());

  const addNewCourse = (req, res, next) => {
    const {
      userId,
      title,
      price,
      category,
      description,
      thumbnailUrl,
      videos,

      createdAt = Date.now(),
    } = req.body;
    console.log("req.body-->", req.body);

    addCourse(
      title,
      price,
      category,
      description,
      thumbnailUrl,
      videos,
      userId,
      createdAt,
      dbRepository
    )
      .then((course) => res.json(course))
      .catch((error) => next(error));
  };

  const fetchCourseById = (req, res, next) => {
    console.log("req.params.id, --- >", req.params.id);
    findById(req.params.id, dbRepository)
      .then((course) => {
        if (!course) {
          throw new Error(`No course found with id: ${req.params.id}`);
        }
        res.json(course);
      })
      .catch((error) => next(error));
  };

  const updateCourseById = (req, res, next) => {
    const {
      userId,
      courseTitle,
      description,
      thumbnailImg,
      videoFiles,
      createdAt, 
      status,
    } = req.body;

    updateById(
      req.params.id,
      userId,
      courseTitle,
      description,
      thumbnailImg,
      videoFiles,
      status,
      createdAt, 
      dbRepository
    )
      .then(() => {
        res.json({ message: "successfully uploaded" });
      })
      .catch((error) => {
        res.json({ error: error.message });
      });
  };

  const deleteCourseById = (req, res, next) => {
    deleteById(req.params.id, dbRepository)
      .then(() => res.json("Course sucessfully deleted!"))
      .catch((error) => next(error));
  };

  const fetchCourseByUserId = (req, res, next) => {
    console.log(req.params.id);
    findByUserId(req.params.id, dbRepository)
      .then((courses) => {
        if (!courses || courses.length === 0) {
          throw new Error(
            `No courses found for user with id: ${req.params.id}`
          );
        }
        res.json(courses);
      })
      .catch((error) => {
        res.json({ error: error.message });
      });
  };

  const fetchAllCourse = async (req, res, next) => {
    try {
      const courses = await findAll(dbRepository);
      if (!courses || courses.length === 0) {
        throw new Error(`No courses found `);
      }

      res.json(courses);
    } catch (err) {
      console.error(err);
      next(err);
    }
  };
  
  const getCourseByIds = async (req, res, next) => {
    const { ids } = req.body;
    console.log("IDs:", ids);
    try {
      const courses = await findByIds(ids, dbRepository);
      res.json(courses);
    } catch (err) {
      console.error("Error finding courses by IDs:", err);
      next(err);
    }
  };
  

  return {
    addNewCourse,
    fetchCourseById,
    updateCourseById,
    deleteCourseById,
    fetchCourseByUserId,
    fetchAllCourse,
    getCourseByIds
  };
}
