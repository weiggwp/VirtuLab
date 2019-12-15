package backend.repository;


import backend.model.Course;
import backend.model.Lab;
import backend.model.User;
import backend.model.UserCourseLab;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCourseLabRepository extends CrudRepository<UserCourseLab, Long> {

    Optional<UserCourseLab> findUserCourseLabByUserAndCourseAndLab(User user, Course course, Lab lab);

    List<UserCourseLab> findAllByCourse(Course course);

    List<UserCourseLab> findAllByLab(Lab lab);

    List<UserCourseLab> findAllByUser(User user);

    boolean existsByUserAndAndCourseAndAndLab(User user, Course course, Lab lab);

}
