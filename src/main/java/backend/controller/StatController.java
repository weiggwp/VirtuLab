package backend.controller;

import backend.dto.CourseDTO;
import backend.dto.UserDTO;
import backend.model.Course;
import backend.model.User;
import backend.model.UserCourse;
import backend.model.UserCourseLab;
import backend.service.CourseService;
import backend.service.UserCourseLabService;
import backend.service.UserService;
import backend.util.Statistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;


@Controller
@CrossOrigin(origins = "*")
public class StatController {


    @Autowired
    UserService userService;

    @Autowired
    UserCourseLabService userCourseLabService;

    @Autowired
    CourseService courseService;

//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/student_complete_rate", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity studentCompletion(@RequestBody UserDTO userDTO) {
//        System.out.println("StatController student completion rate: ");
//
//        String email = userDTO.getEmail_address();
//        User user = userService.findByEmail(email);
//
//        double[] stats;
//        if (user.getRole().equals("student")) {
//            stats = Statistic.findCompletionStats(user);
//        }
//
//        /* stats[0] = finish percentage */
//        /* stats[1] = 1 - stats[0] */
//
//
//    }



    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/lab_stats", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity courseStats(@RequestBody CourseDTO courseDTO) {
        System.out.println("StatController course stats: ");

        double[] res = new double[3];
        String code = courseDTO.getCode();
//        long courseID = courseDTO.getCourseID();
        long courseID = 9;

        Optional<Course> optional = courseService.findCourseById(courseID);
        if (optional.isPresent()) {
            Course course = optional.get();
            List<UserCourseLab> list = userCourseLabService.findAllByCourse(course);


            /* size is the number of students in the course */
            int size = list.size();
            int n = 0;
            for (UserCourseLab userCourseLab: list) {
//                System.out.println(userCourseLab);
                if (userCourseLab.getUser().getRole().toLowerCase().equals("student") &&
                    userCourseLab.getComplete() > 0)
                    n ++;
            }
            /* stats[0] = finish percentage */
            /* stats[1] = 1 - stats[0] */
            double[] percentages = Statistic.findPercentage(n, size);
            res[0] = percentages[0] * 100;
            res[1] = percentages[1] * 100;
            res[2] = size;

            System.out.println(size);
            System.out.println(res[0]);
            System.out.println(res[1]);


            return new ResponseEntity(res, HttpStatus.OK);
        }
        res[1] = 100;
        return new ResponseEntity(res, HttpStatus.NOT_FOUND);
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_completion", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity getCompletion(@RequestBody CourseDTO courseDTO) {
        System.out.println("StatController course stats: ");

        double[] res = new double[3];
        String code = courseDTO.getCode();
//        long courseID = courseDTO.getCourseID();
        long courseID = 9;
        System.out.println("coursedto is "+courseDTO);
        Optional<Course> optional = courseService.findCourseByNameOrCode(courseDTO.getCourseNumber(), 0);
        List<User> students = new LinkedList<>();
        if (optional.isPresent()) {
            Course course = optional.get();
            List<UserCourseLab> list = userCourseLabService.findAllByCourse(course);


            /* size is the number of students in the course */
            int size = list.size();
            int n = 0;
            for (UserCourseLab userCourseLab : list) {
//                System.out.println(userCourseLab);
                if (userCourseLab.getUser().getRole().toLowerCase().equals("student")) {
                    boolean toAdd=true;
                    for (User existingStudents: students){
                        if (existingStudents.getEmail().equals(userCourseLab.getUser().getEmail())){
                            toAdd=false;
                            break;
                        }
                    }
                    if (toAdd){
                        User add = userCourseLab.getUser();

                        add.setCompleted(userCourseLab.getComplete());
                        if (add.getCompleted()==1){
                            add.setDateCompleted(userCourseLab.getSubmittedDate());
                        }
                        students.add(userCourseLab.getUser());
                    }

                }


            }

            return new ResponseEntity(students, HttpStatus.OK);
        }
        System.out.println("returning null");
        return new ResponseEntity(HttpStatus.NOT_FOUND);

    }

}
