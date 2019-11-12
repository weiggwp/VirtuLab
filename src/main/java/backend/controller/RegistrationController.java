package backend.controller;

import backend.dto.UserDTO;
import backend.model.User;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@Controller
@CrossOrigin(origins = "*")
@RequestMapping("/signup")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @ModelAttribute("user")
    public UserDTO userRegistrationDto() {
        return new UserDTO();
    }

    @CrossOrigin(origins = "*")
    @PostMapping
    @ResponseBody
    public ResponseEntity registerUserAccount(@RequestBody UserDTO userDto, BindingResult result,
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

        if(errorMessge!=null)
        {
            return new ResponseEntity<>(errorMessge,HttpStatus.BAD_REQUEST);
        }


        userService.register(userDto);
        return new ResponseEntity(HttpStatus.OK);
    }
}