package backend.controller;

import backend.dto.UserDTO;
import backend.model.User;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    UserService userService;
    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity loginPage(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        System.out.println("Login Controller is called");

        User existing = userService.findByEmail(userDTO.getEmail_address());
        System.out.println(existing==null);

        if (existing == null)
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        System.out.println(existing.getPassword() + "versus " +userDTO.getPassword()+";"+(existing.getPassword() == userDTO.getPassword()));
        System.out.println(passwordEncoder.matches(userDTO.getPassword(),existing.getPassword()));
        if (!passwordEncoder.matches(userDTO.getPassword(),existing.getPassword()))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);





//        String errorMessge = null;
//        if(error != null) {
//            errorMessge = "Username or Password is incorrect !!";
//        }
//        if(logout != null) {
//            errorMessge = "You have been successfully logged out !!";
//        }
//        model.addAttribute("errorMessge", errorMessge);
//        return "login";
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value="/logout", method = RequestMethod.GET)
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout=true";
    }


}
