package backend.controller;

import backend.dto.LabDTO;
import backend.dto.UserDTO;
import backend.model.Lab;
import backend.model.User;
import backend.service.LabService;
import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@CrossOrigin(origins = "*")
public class LabController {

    @Autowired
    LabService labService;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
    public ResponseEntity saveLab(@RequestBody LabDTO labDTO) {

        System.out.println(labDTO.getId());
        System.out.println("lab Controller is called");

        Lab existing = labService.findByLabID(labDTO.getId());
        System.out.println("existing:"+existing);
        long returnid = -1;
        if (existing != null) {
            System.out.println(existing);
            System.out.println(existing.getSteps());
            labService.save(labDTO);
        }
        else
            returnid = labService.createNewLab(labDTO);
        System.out.println("return http OK\n"+returnid);

        return new ResponseEntity<>(returnid, HttpStatus.OK);
    }


}
