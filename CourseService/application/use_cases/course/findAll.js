export default function findAll(courseRepository) {
    if (!courseRepository || typeof courseRepository.findAll !== 'function') {
        throw new Error('Invalid course repository provided');
    }
    
    return courseRepository.findAll();
}
