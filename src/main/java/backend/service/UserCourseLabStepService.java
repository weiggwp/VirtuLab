package backend.service;


import backend.model.*;
import backend.repository.UserCourseLabStepRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCourseLabStepService {

    @Autowired
    UserCourseLabStepRepository userCourseLabStepRepository;

    public void save(UserCourseLabStep userCourseLabStep) {
        userCourseLabStepRepository.save(userCourseLabStep);
    }

/*
    public List<UserCourseLabStep> findAllByCourse(Course course) {
        return userCourseLabStepRepository.findAllByCourse(course);
    }
*/
public List<UserCourseLabStep> findAll() {
    return userCourseLabStepRepository.findAll();
}
    public boolean exists(UserCourseLab userCourseLab, Step step) {
        return userCourseLabStepRepository.existsByUserCourseLabAndStep(userCourseLab, step);
    }
}
