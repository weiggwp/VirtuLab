package backend.service;


import backend.model.Course;
import backend.model.Lab;
import backend.model.User;
import backend.model.UserCourseLab;
import backend.repository.UserCourseLabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCourseLabService {

    @Autowired
    UserCourseLabRepository userCourseLabRepository;

    public Optional<UserCourseLab> findAssociation(User user, Course course, Lab lab){
        Optional<UserCourseLab> optional =
                userCourseLabRepository.
                        findUserCourseLabByUserAndCourseAndLab(user, course, lab);
        return optional;
    }

    public List<UserCourseLab> findAllByUser(User user) {
        return userCourseLabRepository.findAllByUser(user);
    }

    public List<UserCourseLab> findAllByCourse(Course course) {
        return userCourseLabRepository.findAllByCourse(course);
    }

    public List<UserCourseLab> findAllByUser(Lab lab) {
        return userCourseLabRepository.findAllByLab(lab);
    }

}
