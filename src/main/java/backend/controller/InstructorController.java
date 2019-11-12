//package backend.controller;
//
//
//import backend.dto.InstructorDTO;
//import backend.model.Instructor;
//import backend.service.InstructorService;
//import org.springframework.ui.Model;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.validation.Valid;
//import java.util.ArrayList;
//
//@Controller
//@RequestMapping("/register_instructor")
//public class InstructorController {
//
//    @Autowired
//    InstructorService instructorService;
//
//    @ModelAttribute("instructor")
//    public InstructorDTO instructorRegistrationDTO () {
//        return new InstructorDTO();
//    }
//
//    @GetMapping
//    public String showRegistrationForm(Model model) {
//        return "register";
//    }
//
//
//    @PostMapping
//    public String registerInstructorAccount(@ModelAttribute("instructor") @Valid InstructorDTO instructorDTO,
//                                            BindingResult result, Model model) {
//
//        String errorMessge = null;
//        Instructor existing = instructorService.isRegister(instructorDTO.getEmail());
//        if (result.hasErrors()) {
//            errorMessge =  "Username or Password is invalid !";
//        }
//
//        else if (existing != null) {
//            errorMessge = "Username occupied! Please use another username.";
//        }
//        model.addAttribute("errorMessge", errorMessge);
//        if (errorMessge!=null) {
//            return "register";
//        }
//
//        Instructor instructor = new Instructor();
//        instructor.setFirstName(instructorDTO.getFirstName());
//        instructor.setLastName(instructorDTO.getLastName());
//        instructor.setEmail(instructorDTO.getEmail());
//        instructor.setPassword(instructorDTO.getPassword());
//        instructor.setCourseList(new ArrayList<>());
//        instructorService.register(instructor);
//
//        return "redirect:/login";
//
//    }
//
//
//
//}
