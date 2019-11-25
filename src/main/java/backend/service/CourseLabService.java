package backend.service;


import backend.model.CourseLab;
import backend.repository.CourseLabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseLabService {

    @Autowired
    CourseLabRepository courseLabRepository;

    public void saveOrUpdate(CourseLab courseLab) {
        courseLabRepository.save(courseLab);
    }
}
