package backend.service;


import backend.model.Step;
import backend.model.UserCourseLab;
import backend.model.UserCourseLabStep;
import backend.repository.UserCourseLabStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCourseLabStepService {

    @Autowired
    UserCourseLabStepRepository userCourseLabStepRepository;

    public void save(UserCourseLabStep userCourseLabStep) {
        userCourseLabStepRepository.save(userCourseLabStep);
    }

    public boolean exists(UserCourseLab userCourseLab, Step step) {
        return userCourseLabStepRepository.existsByUserCourseLabAndStep(userCourseLab, step);
    }
}
