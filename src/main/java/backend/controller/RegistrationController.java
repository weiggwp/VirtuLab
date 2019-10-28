package backend.controller;

import javax.validation.Valid;

import backend.dto.UserDTO;
import backend.model.User;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;



@Controller
@CrossOrigin(origins = "localhost:3000")
@RequestMapping("/signup")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @ModelAttribute("user")
    public UserDTO userRegistrationDto() {
        return new UserDTO();
    }

    @GetMapping
    public String showRegistrationForm(Model model) {
        return "register";
    }

    @CrossOrigin(origins = "localhost:3000")
    @PostMapping
    public String registerUserAccount(@ModelAttribute("user") UserDTO userDto, BindingResult result,
                                      Model model) {
        System.out.println(userDto);
        System.out.println("RegistrationController is called");

        String errorMessge = null;
        User existing = userService.findByEmail(userDto.getEmail_address());
        if (result.hasErrors()) {
            errorMessge =  "Username or Password is invalid !";
        }

        else if (existing != null) {
            errorMessge = "Username occupied! Please use another username.";
        }
        model.addAttribute("errorMessge", errorMessge);
        if (errorMessge != null) {
            return "register";
        }

        userService.register(userDto);

        return "redirect:/login";
    }
}