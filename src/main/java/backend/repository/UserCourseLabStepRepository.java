package backend.repository;

import backend.model.*;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserCourseLabStepRepository extends CrudRepository<UserCourseLabStep, Long> {

    Optional<UserCourseLabStep> findByUserCourseLabAndStep(UserCourseLab userCourseLab, Step step);

    boolean existsByUserCourseLabAndStep(UserCourseLab userCourseLab, Step step);


    List<UserCourseLabStep> findAll();
}
