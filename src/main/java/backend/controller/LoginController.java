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
import java.util.HashMap;

@Controller
@CrossOrigin(origins = "*")
public class LoginController {

    private final String ERRMSG = "fail";
    private final String SUCCESS = "success";

    @Autowired
    UserService userService;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> loginPage(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        System.out.println("Login Controller is called");
        System.out.println(userDTO.getEmail_address());
        User existing = userService.findByEmail(userDTO.getEmail_address());
        System.out.println("existing:"+existing);


        HashMap<String, Object> map = new HashMap<>();
        if (existing == null) {
            map.put("msg", ERRMSG);
            return map;
        }

        map.put("msg", SUCCESS);
        map.put("user", existing);
        return map;

//        if (!passwordEncoder.matches(userDTO.getPassword(),existing.getPassword()))
//            return new ResponseEntity(HttpStatus.BAD_REQUEST);
//        System.out.println("return http OK\n");




//        String errorMessge = null;
//        if(error != null) {
//            errorMessge = "Username or Password is incorrect !!";
//        }
//        if(logout != null) {
//            errorMessge = "You have been successfully logged out !!";
//        }
//        model.addAttribute("errorMessge", errorMessge);
//        return "login";
//        return existing;
    }

//    @RequestMapping(value="/logout", method = RequestMethod.POST)
//    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null){
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//        }
//        return "redirect:/login?logout=true";
//    }


}
