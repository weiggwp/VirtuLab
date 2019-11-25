package backend.controller;


import backend.dto.CourseDTO;
import backend.dto.LabDTO;
import backend.dto.UserDTO;
import backend.model.*;
import backend.repository.UserRepository;
import backend.service.CourseService;
import backend.service.UserCourseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.xml.ws.Response;
import java.util.*;

@Controller
@CrossOrigin(origins = "*")
public class CourseController {

    private final String ERRMSG = "fail";
    private final String SUCCESS = "success";

    @Autowired
    CourseService courseService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserCourseService userCourseService;

    @Autowired
    ModelMapper modelMapper;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/create_course", method = RequestMethod.POST)
    @ResponseBody
    public Course addCourse(@RequestBody CourseDTO courseDTO) {


        System.out.println("CourseController create course: ");
        System.out.println(courseDTO);
        String email = courseDTO.getEmail();
        User user = userRepository.findByEmail(email);
        Map<String, Object>  map = new HashMap<>();
        /* In DB, reject request to add course*/
        for (int i=0; i<user.getUserCourseList().size(); i++)
       if (user.getUserCourseList().get(i).getCourse().getCourseName().equals(courseDTO.getCourseName())) {
            map.put("msg", ERRMSG);
            System.out.println("Instructors must have unique coursenames");
            return null;
        }
       // System.out.println("Store to DB");

        /* convert DTO to entity, add to DB */
        Course c = modelMapper.map(courseDTO, Course.class);
        System.out.println(c);
        System.out.println("Dootw");
        UserCourse userCourse = new UserCourse();
        userCourse.setCourse(c);
        userCourse.setUser(user);

        c.getUserCourseList().add(userCourse);

        user.getUserCourseList().add(userCourse);
     //   System.out.println("current list");
       // for (int i=0; i<user.getUserCourseList().size();i++)
       //     System.out.println(user.getUserCourseList().get(i).getCourse().getCourseName());
//        userCourseService.saveUserCourse(userCourse);
        System.out.println( "Adding " +c + " to courseService");
        courseService.addCourse(c);
        System.out.println("we found: " +courseService.findCourseByNameOrCode(c.getAccessCode(),0));
        userRepository.save(user);


//        user.getCourses().add(c);
//        userRepository.save(user);

        return c;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/delete_course", method = RequestMethod.POST)
    public Map<String, Object> deleteCourse(@RequestBody String name) {
        System.out.println("CourseController delete operation: ");

        Map<String, Object>  map = new HashMap<>();
        /* Not in DB, reject request to delete course*/
        if (courseService.courseExists(name)) {
            map.put("msg", ERRMSG);
            return map;
        }

        /* del from DB */
        Optional<Course> c = courseService.findCourseByName(name);
        Course course = c.get();
        courseService.deleteCourse(course.getCourseID());
        map.put("msg", SUCCESS);
        return map;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/update_course", method = RequestMethod.POST)
    public Map<String, Object> updateCourse(@RequestBody String name) {
        System.out.println("CourseController update operation: ");
        return null;
    }
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_students", method = RequestMethod.POST)
    public ResponseEntity<List<User>> getStudents(@RequestBody CourseDTO courseDTO) {
        System.out.println("course is "+courseDTO);
        List<UserCourse> userCourses = userCourseService.getAllUserCourses();
        List<User> students = new LinkedList<>();
        for (UserCourse userCourse: userCourses){
              //  System.out.println("coursecode is " +userCourse.getCourse().getAccessCode());
            if (userCourse.getCourse().getAccessCode().equals(courseDTO.getCourseNumber())){
             //   System.out.println("adding " +userCourse.getUser());
                if (userCourse.getUser().getRole().toLowerCase().equals("student"))
                    students.add(userCourse.getUser());
            }
        }
        return new ResponseEntity(students, HttpStatus.OK);
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_courses", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<Course>> getAllCourse(@RequestBody CourseDTO courseDTO) {
        System.out.println("Course Controller called: get_courses");
        Map<String, Object> map = new HashMap<>();
     //   System.out.println(courseDTO);
        String email = courseDTO.getEmail();
        User user = userRepository.findByEmail(email);

        System.out.println("user is "+ user);

       // System.out.println("user is "+user);

        List<CourseDTO> courseDTOList = new ArrayList<>();
        List<Course> list = new ArrayList<>();
        if(user.getUserCourseList()!=null)
        for (UserCourse userCourse: user.getUserCourseList()) {

            CourseDTO dto = new CourseDTO();
            Course course = userCourse.getCourse();
            System.out.println("this course is "+course);
            dto.setCode(course.getAccessCode());
            dto.setCourseName(course.getCourseName());
            dto.setCourseID(course.getCourseID());
            dto.setCourseNumber(course.getCourseNumber());
            dto.setCourseDescription(course.getCourseDescription());
       //     System.out.println(course);
            list.add(course);

            List<LabDTO> labs = new ArrayList<>();
            for (CourseLab courseLab: course.getCourseLabList()) {

                Lab lab = courseLab.getLab();
                System.out.println(lab);
                LabDTO labDTO = new LabDTO();
                labDTO.setDate(courseLab.getDate());
                labDTO.setName(lab.getName());
                labDTO.setCreator(lab.getCreator());
                labDTO.setDescription(lab.getDescription());
                labDTO.setLabID(lab.getLabID());
                labs.add(labDTO);
            }

            dto.setLabDTOS(labs);
            courseDTOList.add(dto);
        }
      //  System.out.println("returning ok");
        System.out.println("LEAVING GET COURSES");
        return new ResponseEntity(courseDTOList, HttpStatus.OK);
//        map.put("msg", SUCCESS);
//        map.put("list", list);
//        return map;

    }


    @RequestMapping(value = "/enroll", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity enroll(@RequestBody CourseDTO courseDto) {
    //    System.out.println("course is is " +courseDto.toString());

        String courseName="";
        String  labName="";

            courseName = "Introduction to General Chemistry| Fall 2019";
            labName="Chem I Lab";
        try {
            Course course = getCourses(courseDto);
            String email = courseDto.getEmail();
            User user = userRepository.findByEmail(email);
            System.out.println("user is " + user);
            for (int i=0; i<user.getUserCourseList().size(); i++)
            if (user.getUserCourseList().get(i).getCourse().equals(course)){
                return new ResponseEntity("already enrolled",HttpStatus.NOT_FOUND);
            }
            Lab lab = new Lab(6 ,labName);
            course.addLab(lab);
            UserCourse usercourse = new UserCourse(user.getId(),user,course);
            userCourseService.saveUserCourse(usercourse);
            System.out.println("enrolling!");
//        return "redirect:/login";
            return new ResponseEntity(courseName, HttpStatus.OK);
        }
        catch (Exception e){
           // e.printStackTrace();
            return new ResponseEntity("Not found",HttpStatus.NOT_FOUND);
        }
    }


//    private List<UserCourse> removeUserCourse(long userID, long courseID, List<UserCourse> list) {
//
//
//        for (UserCourse userCourse: list) {
//            if (userCourse.getUser().getId() == userID &&
//                    userCourse.getCourse().getCourseID() == courseID) {
//                list.remove(userCourse);
//            }
//        }
//        return list;
//    }

    @RequestMapping(value = "/drop", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity drop(@RequestBody CourseDTO courseDto) {
        System.out.println("Course Controller Drop operation: ");
        System.out.println("course to dropped " +courseDto);

        long courseID = courseDto.getCourseID();
        String email = courseDto.getEmail();
        User user = userRepository.findByEmail(email);
        System.out.println(user);
        Optional<Course> optional = courseService.findCourseById(courseID);
        Course course = optional.get();

//        UserCourse del = new UserCourse(user, course);
        /* student dropping a course */
        if (user.getRole().equals("student")) {

            for (Iterator<UserCourse> it = user.getUserCourseList().iterator(); it.hasNext();) {
                UserCourse userCourse = it.next();
                if (userCourse.getUser().getId() == user.getId() &&
                    userCourse.getCourse().getCourseID() == courseID){
                    it.remove();
                }

            }
//            course.getUserCourseList().remove(del);
            userRepository.save(user);

        }
        /* instructor dropping a course*/
        if (user.getRole().equals("instructor")) {
            System.out.println("instructor doing delete");

            /* delete in the user side */
            course.getUserCourseList().clear();
            for (Iterator<UserCourse> it = user.getUserCourseList().iterator(); it.hasNext();) {
                UserCourse userCourse = it.next();
                if (userCourse.getUser().getId() == user.getId() &&
                        userCourse.getCourse().getCourseID() == courseID) {
                    it.remove();
                }
            }

            //  remove all the lab in the association
            course.getLabs().clear();
//            courseService.addCourse(course);
            courseService.deleteCourseById(course.getCourseID());



//            for (UserCourse userCourse: course.getUserCourseList()) {
//                User u = userCourse.getUser();
////                u.getUserCourseList().remove(del);
//                removeUserCourse(u.getId(), course.getCourseID(), u.getUserCourseList());
//                userRepository.save(u);
//            }

//            courseService.deleteCourseById(courseID);
        }
        return new ResponseEntity(HttpStatus.OK);
    }



    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_course", method = RequestMethod.POST)
    @ResponseBody
    public Course getCourses(@RequestBody CourseDTO courseDTO) {
        System.out.println("CourseController read operation: ");
        System.out.println(courseDTO);
        Map<String, Course> map = new HashMap<>();

//        if (courseService.findCourseByNameOrCode(get))
//        User user = getLoginUser();
//        List<Course> coursesList = user.getCourses();

        // TODO: save this course to user later;

        String code = courseDTO.getCourseNumber();
        if (!courseService.courseExists(code, 0)) {
            map.put("msg", null);
            System.out.println("course doesnt exist with  code " +code);
            return null;
        }

        Optional<Course> optionalCourse = courseService.findCourseByNameOrCode(code, 0);
        Course course = optionalCourse.get();

        System.out.println(course);

        return course;
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/set_date", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity setDate(@RequestBody CourseDTO courseDTO) {
        System.out.println("CourseController set date for a lab: ");
        // send the lab you want to send the date in a list
        long labID = courseDTO.getLabDTOS().get(0).getLabID();
        System.out.println("course dto is "+courseDTO + " date is " +courseDTO.getDate().toString());
        long courseID = courseDTO.getCourseID();
        Optional<Course> optional = courseService.findCourseByNameOrCode(courseDTO.getCode(),0);
        if (optional.isPresent()) {

            Course course = optional.get();
            for (CourseLab courseLab: course.getCourseLabList()) {
                if (courseLab.getLab().getLabID() == labID)
                    courseLab.setDate(courseDTO.getDate());
            }

            courseService.addCourse(course);
        }
        return new ResponseEntity(HttpStatus.OK);
    }



    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    private User getLoginUser() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = "";
        if (principal instanceof UserDetails) {
            email = ((UserDetails)principal).getUsername();
        } else {
            email = principal.toString();
        }
        User user = userRepository.findByEmail(email);

        return user;
    }

}
