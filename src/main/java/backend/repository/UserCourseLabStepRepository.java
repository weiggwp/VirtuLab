package backend.repository;

import backend.model.Step;
import backend.model.UserCourse;
import backend.model.UserCourseLab;
import backend.model.UserCourseLabStep;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserCourseLabStepRepository extends CrudRepository<UserCourseLabStep, Long> {

    Optional<UserCourseLabStep> findByUserCourseLabAndStep(UserCourseLab userCourseLab, Step step);

    boolean existsByUserCourseLabAndStep(UserCourseLab userCourseLab, Step step);


}
