package backend.controller;

import backend.dto.CourseDTO;
import backend.dto.UserDTO;
import backend.model.Course;
import backend.model.Lab;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;


@Controller
@CrossOrigin(origins = "*")
//@RequestMapping("/student_home")
public class StudentHomeController {

    @Autowired
    private UserService userService;

    @ModelAttribute("user")
    public UserDTO studentHome() {
        return new UserDTO();
    }
    private boolean instantiated=false;
    private ArrayList<Course> courses;

/*
    @CrossOrigin(origins = "*")
    @PostMapping
    @GetMapping("/student_home")
    public ResponseEntity getCourses(@RequestBody UserDTO userDto, BindingResult result,
                                     Model model) {

        if (!instantiated){
            courses = new ArrayList<>();
            Course course1 = new Course("Class 1: Study of Organisms and Behaviors| Fall 2019\n",1);
            Course course2 = new Course("Class 2: Study of Organisms and Behaviors| Fall 2019\n",2);
            Course course3 = new Course("Class 3: Study of Organisms and Behaviors| Fall 2019\n",3);
            course1.addLab(new Lab(1,"Lab 1"));
            course1.addLab(new Lab(2,"Lab 2"));
            course2.addLab(new Lab(3,"Lab 3"));

            courses.add(course1);
            courses.add(course2);
            courses.add(course3);
                    instantiated=true;
        }
        Object[] array =  courses.toArray();
        Course[] arr = new Course[array.length];
        for (int i=0; i<arr.length; i++){
            arr[i]=(Course)array[i];
        }

        model.addAttribute("courses",arr);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("studentHome");
        System.out.println("courses called");
//        return "redirect:/login";
        return new ResponseEntity(arr,HttpStatus.OK);
    }

int count=4;
    @RequestMapping(value="/enroll", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity enroll(@RequestBody CourseDTO courseDto) {
        System.out.println("course is is " +courseDto.toString());

        String courseName="";
        String  labName="";
        if (courseDto.getCourseNumber().equals("CHE 101")) {
            courseName = "Introduction to General Chemistry| Fall 2019";
            labName="Chem I Lab";
        }
        else if (courseDto.getCourseNumber().equals("BIO 101")) {
            courseName = "Introduction to General Biology| Fall 2019";
            labName="Bio I lab";
        }
        else if (courseDto.getCourseNumber().equals("BIO 201")) {
            courseName = "Biology II| Fall 2019";
            labName= "Bio II Lab";
        }
        else {

            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        Course c = new Course(courseName,count++);
        Lab lab = new Lab(count+5,labName);
        c.addLab(lab);
        courses.add(c);

        System.out.println("enrolling!");
//        return "redirect:/login";
        return new ResponseEntity(courseName,HttpStatus.OK);
    }
    @RequestMapping(value="/drop", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity drop(@RequestBody CourseDTO courseDto, BindingResult result,
                               Model model) {

        System.out.println("course is is " +courseDto.toString()+"result is " +result.toString() + " model is " +model.toString());

        int id=Integer.parseInt(courseDto.getCourseNumber())    ;
        for (int i=0; i<courses.size(); i++){
            if (courses.get(i).getCourseID()==id){
                courses.remove(i);
                System.out.println("dropped!");
                return new ResponseEntity(HttpStatus.OK);
            }
            else System.out.println("doesnt match " +courses.get(i).getCourseID());
        }
        System.out.println("Couldn't find id of "+id);
//        return "redirect:/login";
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }*/


}