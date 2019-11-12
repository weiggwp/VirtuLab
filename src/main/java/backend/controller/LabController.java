package backend.controller;


import backend.dto.CourseDTO;
import backend.dto.StepDTO;
import backend.model.Course;
import backend.model.Step;
import backend.service.CourseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import backend.dto.LabDTO;
import backend.dto.UserDTO;
import backend.model.Lab;
import backend.model.User;
import backend.service.LabService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import backend.dto.CourseDTO;
import backend.model.Course;
import backend.service.CourseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@CrossOrigin(origins = "*")
public class LabController {


    private final String ERRMSG = "fail to add lab";
    private final String SUCCESS = "success";

    @Autowired
    CourseService courseService;

    @Autowired
    LabService labService;

    @Autowired
    UserService userService;

    ModelMapper modelMapper = new ModelMapper();

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_labs", method = RequestMethod.POST)
    public Map<String, Object> getLabs() {
        System.out.println("lab Controller is called: get_labs");

        Map<String, Object> map = new HashMap<>();

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = "";
        if (principal instanceof UserDetails) {
            email = ((UserDetails)principal).getUsername();
        } else {
            email = principal.toString();
        }

        User user = userService.findByEmail(email);
        map.put("msg", SUCCESS);
        map.put("list", user.getCourses());
        return map;
    }



    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
    public ResponseEntity saveLab(@RequestBody LabDTO labDTO) {

        System.out.println("lab Controller is called: save_lab");
        System.out.println(labDTO);

        List<StepDTO> steps = labDTO.getSteps();
        for (StepDTO dto: steps) {
            System.out.println(dto);
        }
        Lab lab = modelMapper.map(labDTO, Lab.class);
        System.out.println(lab);
        labService.saveLab(lab);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
