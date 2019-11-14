package backend.controller;


import backend.dto.CourseDTO;
import backend.dto.UserDTO;
import backend.model.Course;
import backend.model.Lab;
import backend.model.User;
import backend.model.UserCourse;
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
        if (courseService.courseExists(courseDTO)) {
            map.put("msg", ERRMSG);
            return null;
        }
        System.out.println("Store to DB");

        /* convert DTO to entity, add to DB */
        Course c = modelMapper.map(courseDTO, Course.class);
        System.out.println(c);

        UserCourse userCourse = new UserCourse();
        userCourse.setCourse(c);
        userCourse.setUser(user);

        c.getUserCourseList().add(userCourse);
        System.out.println(user.getUserCourseList());
        user.getUserCourseList().add(userCourse);

//        userCourseService.saveUserCourse(userCourse);
        courseService.addCourse(c);
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
    @RequestMapping(value = "/get_courses", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<Course>> getAllCourse(@RequestBody CourseDTO courseDTO) {
        System.out.println("Course Controller called: get_courses");
        Map<String, Object> map = new HashMap<>();
        System.out.println(courseDTO);
        String email = courseDTO.getEmail();
        User user = userRepository.findByEmail(email);

        List<Course> list = new ArrayList<>();
        if(user.getUserCourseList()!=null)
        for (UserCourse userCourse: user.getUserCourseList()) {
            Course course = userCourse.getCourse();
            System.out.println(course);
            list.add(course);
        }
        System.out.println("returning ok");

        return new ResponseEntity(list, HttpStatus.OK);
//        map.put("msg", SUCCESS);
//        map.put("list", list);
//        return map;

    }
    @RequestMapping(value = "/enroll", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity enroll(@RequestBody CourseDTO courseDto) {
        System.out.println("course is is " +courseDto.toString());

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

    @RequestMapping(value = "/drop", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity drop(@RequestBody CourseDTO courseDto) {
        System.out.println("course is is " +courseDto.toString());

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
