export default function deleteById(id, courseRepository) {
    return courseRepository.findById(id).then((course) => {
      if (!course) {
        throw new Error(`No post found with id: ${id}`);
      }
      return courseRepository.deleteById(id);
    });
  }