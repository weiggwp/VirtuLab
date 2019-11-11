//package backend.repository;
//
//import backend.model.Course;
//import backend.model.User;
//import backend.model.UserCourse;
//import org.springframework.data.repository.CrudRepository;
//
//import java.util.Optional;
//
//public interface UserCourseRepository extends CrudRepository<UserCourse, Long> {
//
//    @Override
//    Optional<UserCourse> findById(Long aLong);
//
//    Optional<UserCourse> findByCourse(Course course);
//
//    Iterable<Course> findByUserId(User user);
//
//}
