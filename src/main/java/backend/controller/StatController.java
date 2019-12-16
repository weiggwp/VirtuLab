package backend.controller;

import backend.dto.CourseDTO;
import backend.dto.LabDTO;
import backend.dto.UserDTO;
import backend.model.*;

import backend.repository.UserCourseLabStepRepository;
import backend.service.*;
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

import java.util.*;
import java.util.concurrent.TimeUnit;


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

    @Autowired
    LabService labService;

    @Autowired
    UserCourseLabStepRepository userCourseLabStepRepository;

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
        long courseID = courseDTO.getCourseID();

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

            System.out.println("Exit StatsController: ");
            return new ResponseEntity(res, HttpStatus.OK);
        }

        res[1] = 100;
        System.out.println("Exit StatsController2: ");
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
                            System.out.println("date copletd it "+add.getDateCompleted());
                            Date dayAfter = new Date(add.getDateCompleted().getTime() - TimeUnit.HOURS.toMillis(5));
                            add.setDateCompleted(dayAfter);
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


//    /* We should know which step has most tries, so we know that step has problem */
//    /* find all tries, find each stepTries over allTries */
//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/step_stats", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity stepStats(@RequestBody LabDTO labDTO) {
//        System.out.println("StatController course stats: ");
//        System.out.println("labDTO :" + labDTO);
//
//        long labID = labDTO.getLabID();
//
//        Optional<Lab> optional = labService.findLabByLabID(labID);
//
//        if (optional.isPresent()) {
//            Lab lab = optional.get();
//            List<Step> steps = lab.getSteps();
//            System.out.println("steps size is:" + steps.size());
//            double[] triesPerStep = new double[steps.size()];
//            int total = 0;
//            int cnt = 0;
//            int totalTries = 0;
//            for (int i = 0; i < steps.size(); i ++) {
//                Step step = steps.get(i);
//                total += userCourseLabStepRepository.countUserCourseLabStepByStep(step);
//                List<UserCourseLabStep> userCourseLabSteps = userCourseLabStepRepository.findAllByStep(step);
//                cnt = 0;
//                for (int j = 0; j < userCourseLabSteps.size(); j ++) {
//                    int tries = userCourseLabSteps.get(j).getTriesPerStep();
//                    cnt += tries;
//                    totalTries += tries;
//                }
//                triesPerStep[i] = cnt;
//            }
//
//            if (totalTries <= 0) {
//                double[] res = new double[1];
//                res[0] = 100;
//                return new ResponseEntity(res, HttpStatus.OK);
//            }
//
//            double[] res = new double[steps.size()];
//            double stepTries;
//            for (int i = 0; i < res.length; i ++) {
//                stepTries = triesPerStep[i];
//                res[i] = stepTries / totalTries;
//            }
//
//            System.out.println("Exit StatsController: ");
//            return new ResponseEntity(res, HttpStatus.OK);
//        }
//        double[] res = new double[1];
//        res[0] = 100;
//        System.out.println("Exit StatsController2: ");
//        return new ResponseEntity(res, HttpStatus.NOT_FOUND);
//    }


}
