package backend.repository;

import backend.model.Course;
import backend.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {

    Optional<Course> findByCourseName(String courseName);

    Optional<Course> findByAccessCode(String code);


}
