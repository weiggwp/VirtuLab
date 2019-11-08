package backend.service;

import backend.dto.CourseDTO;
import backend.model.Course;
import backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    CourseRepository courseRepository;

    public void addCourse(Course course) {
        courseRepository.save(course);
    }

    public void deleteCourse(Course course) {
        courseRepository.delete(course);
    }

    public boolean courseExists(CourseDTO course){
        String name = course.getCourseName();
        Optional<Course> optional = courseRepository.findByCourseName(name);
        if (optional.isPresent()) return true;
        return false;
    }

}
