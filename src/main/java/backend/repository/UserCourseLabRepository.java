package backend.repository;


import backend.model.Course;
import backend.model.Lab;
import backend.model.User;
import backend.model.UserCourseLab;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCourseLabRepository extends CrudRepository<UserCourseLab, Long> {


    Optional<UserCourseLab> findUserCourseLabByUserAAndCourseAndLab(User user, Course course, Lab lab);
}
