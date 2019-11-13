package backend.controller;


import backend.dto.StepDTO;
import backend.dto.UserDTO;
import backend.model.Step;
import backend.service.CourseService;
import backend.service.StepService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import backend.dto.LabDTO;
import backend.model.Lab;
import backend.model.User;
import backend.service.LabService;
import backend.service.UserService;
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

import java.util.*;

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

    @Autowired
    StepService stepService;

    ModelMapper modelMapper = new ModelMapper();


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
    public ResponseEntity saveLab(@RequestBody LabDTO labDTO) {

        System.out.println("lab Controller is called: save_lab");
        System.out.println(labDTO);
        Lab existing = labService.findByLabID(labDTO.getLabID());


        List<Step> steps = new ArrayList<>();
        for (StepDTO dto: labDTO.getSteps()) {
            Step step = new Step();
            step.setStepNum(dto.getStepNum());
            step.setInstruction(dto.getInstruction());
            stepService.addStep(step);
            steps.add(step);
        }


        long returnid = -1;
        if (existing != null)
        {
            existing.setName(labDTO.getName());
            existing.setLastModified(labDTO.getLastModified());
            existing.setSteps(steps);
            labService.saveLab(existing);

        }
        else {
            System.out.println("lab does not exist, creating new lab");
            Lab lab = modelMapper.map(labDTO, Lab.class);
            lab.setSteps(steps);

            returnid = labService.createNewLab(lab);

            User instructor = userService.findByEmail(labDTO.getCreator());
            instructor.getLabs().add(lab);
            userService.save(instructor);
        }


        return new ResponseEntity<>(returnid, HttpStatus.OK);
    }




    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_labs", method = RequestMethod.POST)
    public ResponseEntity getLabs(@RequestBody UserDTO obj) {


        User user = userService.findByEmail(obj.getEmail_address());
        if(user==null)
        {
            System.out.println("user doesn't exist");

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Lab> labs = user.getLabs();




        if(labs!=null)
        {
            for (Lab lab : labs)
            {
                Collections.sort(lab.getSteps(), new Comparator<Step>() {
                    @Override
                    public int compare(Step o1, Step o2) {
                        long first = o1.getStepNum();
                        long second = o2.getStepNum();
                        if(first>second)
                            return 1;
                        else {
                            if (first == second)
                                return 0;
                            return -1;
                        }
                    }

                });
            }

            return new ResponseEntity<>(user.getLabs(),HttpStatus.OK);
        }
        else
            return new ResponseEntity<>(new ArrayList<>(),HttpStatus.OK);
    }



}
