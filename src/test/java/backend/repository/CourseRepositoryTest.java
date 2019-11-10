package backend.repository;

import backend.model.Course;
import backend.model.Lab;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;


@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
class CourseRepositoryTest {

    @Autowired
    CourseRepository courseRepository;
    @Autowired
    LabRepository labRepository;

    @Test
    void insert(){
        Course course = new Course();
        course.setCourseName("CSE 101");
        courseRepository.save(course);

        Optional<Course> optional = courseRepository.findById(course.getCourseID());
        Course c = optional.get();

        List<Lab> labs = c.getLabs();

        for(Lab lab: labs) System.out.println(lab);
        System.out.println(c.getCourseName());
        assertNotNull(c);
    }

    @Test
    void cascadeTest() {
        Course course = new Course();
        course.setCourseName("CSE 101");

        Lab lab1 = new Lab(); lab1.setName("lab1");
        Lab lab2 = new Lab(); lab2.setName("lab2");
        labRepository.save(lab1);
        labRepository.save(lab2);
        List<Lab> list = new ArrayList<>();
        list.add(lab1); list.add(lab2);
        course.setLabs(list);
        courseRepository.save(course);

        System.out.println("Before Deletion of a Lab");
        Optional<Course> optional = courseRepository.findById(course.getCourseID());
        Course c = optional.get();
        for (Lab lab: c.getLabs()) {System.out.println(lab.getName());}

        System.out.println("After Deletion of a Lab");
        labRepository.deleteById(lab1.getLabID());
        optional = courseRepository.findById(course.getCourseID());
        c = optional.get();
        for (Lab lab: c.getLabs()) {System.out.println(lab.getName());}

    }

    @Test
    void removeLab() {
        Course course = new Course();
        course.setCourseName("CSE 101");

        Lab lab1 = new Lab(); lab1.setName("lab1");
        Lab lab2 = new Lab(); lab2.setName("lab2");
        labRepository.save(lab1);
        labRepository.save(lab2);
        List<Lab> list = new ArrayList<>();
        list.add(lab1); list.add(lab2);
        course.setLabs(list);
        courseRepository.save(course);

        System.out.println("Before Deletion of a Lab");
        Optional<Course> optional = courseRepository.findById(course.getCourseID());
        Course c = optional.get();
        for (Lab lab: c.getLabs()) {System.out.println(lab.getName());}

        System.out.println("After Deletion of a Lab");
        list.remove(0);
        course.setLabs(list);
        courseRepository.save(course);
        optional = courseRepository.findById(course.getCourseID());
        c = optional.get();
        for (Lab lab: c.getLabs()) {System.out.println(lab.getName());}


    }





}