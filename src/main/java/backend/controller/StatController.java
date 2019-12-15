package backend.controller;

import backend.dto.CourseDTO;
import backend.dto.UserDTO;
import backend.model.*;
import backend.service.CourseService;
import backend.service.UserCourseLabService;
import backend.service.UserCourseLabStepService;
import backend.service.UserService;
import backend.util.Statistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    UserCourseLabStepService userCourseLabStepService;

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
    @RequestMapping(value = "/step_stats", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity stepStats(@RequestBody CourseDTO courseDTO) {
        Optional<Course> optional = courseService.findCourseByNameOrCode(courseDTO.getCode(),0);
        if (optional.isPresent()) {
            Course course = optional.get();
            System.out.println("course is "+course);
            HashMap<Long, LinkedList<User>> map = new HashMap<>(); //maps stepnum to list of tries
            List<UserCourseLabStep> list = userCourseLabStepService.findAll();
            for (UserCourseLabStep userCourseLabStep: list) {
//                System.out.println(userCourseLab);
                if (userCourseLabStep.getUserCourseLab().getUser().getRole().toLowerCase().equals("student")
                        && userCourseLabStep.getUserCourseLab().getLab().getLabID() == courseDTO.getLabs().get(0).getLabID()
                        &&userCourseLabStep.getUserCourseLab().getCourse().getCourseID()==course.getCourseID()
                ) {
                    LinkedList<User> lis = map.get(userCourseLabStep.getStep().getStepNum());
                    if (lis==null){
                        lis= new LinkedList<User>();
                        User user = new User();
                        user.setTries(userCourseLabStep.getTriesPerStep());
                        user.setEmail(userCourseLabStep.getUserCourseLab().getUser().getEmail());
                        lis.add(user);
                        map.put(userCourseLabStep.getStep().getStepNum(),lis);
                    }
                    else if (!lis.contains(userCourseLabStep.getUserCourseLab().getUser())) {
                        User user = new User();
                        user.setTries(userCourseLabStep.getTriesPerStep());
                        user.setEmail(userCourseLabStep.getUserCourseLab().getUser().getEmail());

                 /*       System.out.println("stepnum is "+userCourseLabStep.getStep().getStepNum() + " tries is "
                                +userCourseLabStep.getUserCourseLab().getUser().getTries() +"index is "+lis.size());*/
                        lis.add(user);
                        map.put(userCourseLabStep.getStep().getStepNum(),lis);
                    }

                }
            }

            return new ResponseEntity( map,HttpStatus.OK);

        }
        return new ResponseEntity( HttpStatus.NOT_FOUND);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/lab_stats", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity courseStats(@RequestBody CourseDTO courseDTO) {
        System.out.println("StatController course stats: ");
        System.out.println("coursedto is "+courseDTO);
        double[] res = new double[3];
        String code = courseDTO.getCode();
//        long courseID = courseDTO.getCourseID();
        long courseID = 9;

        Optional<Course> optional = courseService.findCourseByNameOrCode(courseDTO.getCode(),0);
        if (optional.isPresent()) {
            Course course = optional.get();
            List<UserCourseLab> list = userCourseLabService.findAllByCourse(course);


            /* size is the number of students in the course */
            int size = list.size();
            int n = 0;
            LinkedList<User> studentIDs = new LinkedList<>();
            for (UserCourseLab userCourseLab: list) {
//                System.out.println(userCourseLab);
                if (userCourseLab.getUser().getRole().toLowerCase().equals("student")
                        &&userCourseLab.getLab().getLabID()==courseDTO.getLabs().get(0).getLabID()&&
                !studentIDs.contains(userCourseLab.getUser().getId())) {
                    User user = new User();
                    user.setId(userCourseLab.getUser().getId());
                    user.setCompleted(userCourseLab.getComplete());
                    n+=user.getCompleted();
                    studentIDs.add(user);
                }

            }
            System.out.println("n is "+n + "studids are "+studentIDs.toString() + " size is " +size + " len is " +studentIDs.size());
            size=studentIDs.size();
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
        long labID=courseDTO.getLabs().get(0).getLabID();
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
                if (userCourseLab.getUser().getRole().toLowerCase().equals("student")&&
                        userCourseLab.getLab().getLabID()==labID) {
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
