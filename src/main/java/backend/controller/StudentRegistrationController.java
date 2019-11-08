package backend.controller;

import backend.dto.StudentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;


@Controller
@RequestMapping("/register_student")

public class StudentRegistrationController {


    @Autowired
    StudentService studentService;

    @ModelAttribute("student")
    public StudentDTO studentRegistrationDTO () {
        return new StudentDTO();
    }

    @GetMapping
    public String showRegistrationForm(Model model) {
        return "register";
    }


    @PostMapping
    public String registerstudentAccount(@ModelAttribute("student") @Valid StudentDTO studentDTO,
                                            BindingResult result, Model model) {

        String errorMessge = null;
        Student existing = studentService.isRegister(studentDTO.getEmail());
        if (result.hasErrors()) {
            errorMessge =  "Username or Password is invalid !";
        }

        else if (existing != null) {
            errorMessge = "Username occupied! Please use another username.";
        }
        model.addAttribute("errorMessge", errorMessge);
        if (errorMessge!=null) {
            return "register";
        }

        Student student = new Student();
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setEmail(studentDTO.getEmail());
        student.setPassword(studentDTO.getPassword());
//        student.setCourseList(new ArrayList<>());
        studentService.register(student);

        return "redirect:/login";

    }



}
