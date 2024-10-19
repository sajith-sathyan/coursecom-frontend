export default function courseRepository(repository) {
  const findByProperty = (params) => repository.findByProperty(params);
  const addCourse = (course) => repository.addCourse(course);
  const findById = (id) => repository.findById(id);
  const findByIds = (ids) => repository.findByIds(ids); 
  const updateById = (id, course) => repository.updateById(id, course);
  const deleteById = (id) => repository.deleteById(id);
  const findByUserId = (id) => repository.findByUserId(id);
  const findAll = () => repository.findAll();

  return {
    findByProperty,
    addCourse,
    findById,
    findByIds, 
    updateById,
    deleteById,
    findByUserId,
    findAll,
  };
}
