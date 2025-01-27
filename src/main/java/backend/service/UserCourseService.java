package backend.service;


import backend.model.UserCourse;
import backend.repository.UserCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserCourseService {

    @Autowired
    UserCourseRepository userCourseRepository;

    public void saveUserCourse(UserCourse userCourse) {
        userCourseRepository.save(userCourse);
    }
    public List<UserCourse> getAllUserCourses(){
        return (List<UserCourse>) userCourseRepository.findAll();
    }
}
