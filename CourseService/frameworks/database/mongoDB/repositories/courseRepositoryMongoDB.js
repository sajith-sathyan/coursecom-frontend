  import courseModel from "../model/course.js";

  // move it to a proper place
  function omit(obj, ...props) {
    const result = { ...obj };
    props.forEach((prop) => delete result[prop]);
    return result;
  }

  export default function courseRepositoryMongoDB() {
    const addCourse = (courseEntity) => {
   
      const newCourse = new courseModel({
        title:courseEntity.getTitleName(),
        price:courseEntity.getPriceName(),
        category:courseEntity.getCategoryName(),
        description:courseEntity.getDescriptionName(),
        thumbnailUrl:courseEntity.getthumbnailUrlName(),
        userId:courseEntity.getUserIdName(),
        createdAt:courseEntity.getCreatedAt(),
        videos:courseEntity.getVideosName()
      });
      return newCourse.save();
    };

    const findById = (id) => {
      console.log("id :", id); 
      return courseModel.findById(id);
    };
    

    const updateById = (id,courseEntity)=>{
      const updatedCourse={
        courseTitle: courseEntity.getTitleName(),
        description: courseEntity.getDescriptionName(),
        thumbnailImg: courseEntity.getThumbnailImgName(),
        videoFiles: courseEntity.videoFilesName(),
        userId: courseEntity.getUserIdName(),
        status:courseEntity.getStatusName(),
        createdAt: new Date()
      };
      return courseModel.findOneAndUpdate(
        { _id: id },
        { $set: updatedCourse },
        { new: true }
      );
    }

    const deleteById = (id) => courseModel.findByIdAndDelete(id);

    const findByUserId = (userId) => {
      console.log("User ID:", userId); 
      return courseModel.find({ userId: userId });  
    };

    const findAll = async () => {
   
      try {
        const allCourses = await courseModel.find();
        console.log("allCourses--->",allCourses)
        return allCourses;
      } catch (error) {
        console.error("Error fetching all courses:", error);
        throw error;
      }
    };
    const findByIds = async (ids) => {
      try {
        // Validate that all IDs are valid ObjectId strings
       
    
        // Find documents with the given IDs
        const courses = await courseModel.find({ _id: { $in: ids } });
    
        return courses;
      } catch (error) {
        console.error("Error finding courses by IDs:", error);
        throw error;
      }
    };
    
    
  
  

    return {
      addCourse,
      findById,
      updateById,
      deleteById,
      findByUserId,
      findAll,
      findByIds
    };
  } 
