package backend.service;

import backend.dto.CourseDTO;
import backend.model.Course;
import backend.model.Lab;
import backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public void deleteCourse(long id) {courseRepository.deleteById(id);}

    public Optional<Course> findCourseByName(String name) { return courseRepository.findByCourseName(name); }

    public boolean courseExists(CourseDTO course){
        String name = course.getCourseName();
        Optional<Course> optional = courseRepository.findByCourseName(name);
        if (optional.isPresent()) return true;
        return false;
    }

    public boolean courseExists(String name) {
        Optional<Course> optional = courseRepository.findByCourseName(name);
        if (optional.isPresent()) return true;
        return false;
    }

    public boolean labAlreadyInCourse(Course course, long labID) {
        List<Lab> labs = course.getLabs();
        for (Lab lab: labs) {
            if (lab.getLabID() == labID) {
                return true;
            }
        }
        return false;
    }

    public boolean labAlreadyInCourse(Course course, Lab lab) {
        return labAlreadyInCourse(course, lab.getLabID());
    }

}
