package backend.controller;


import backend.dto.StepDTO;
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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
//    public Map<String, Object> addLab(@RequestBody CourseDTO courseDTO) {
//        System.out.println("LabController: ");
//        // TODO: check if lab exists, save lab otherwise
//
//        Map<String, Object>  map = new HashMap<>();
//        /* In DB, reject request to add course*/
//        if (false) {
//            map.put("msg", ERRMSG);
//            return map;
//        }
//
//        /* convert DTO to entity, add to DB */
//        map.put("msg", SUCCESS);
//        return map;
//    }




    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
    public ResponseEntity saveLab(@RequestBody LabDTO labDTO) {

        System.out.println("lab Controller is called: save_lab");
        System.out.println(labDTO);

//       Should prints:
//       LabDTO{, name='Untitled Lab', lastModified=null, instructorID=666, steps=[StepDTO{stepNum=0, instruction='This is the setup stage. Click on equipments you would like to be available for the duration of the lab (click again to unselect) '}, StepDTO{stepNum=1, instruction='fhdfhdfdfhfd'}]}


//        Lab existing = labService.findByLabID(labDTO.getId());
//        System.out.println("existing:"+existing);
//        long returnid = -1;
//        if (existing != null) {
//            System.out.println(existing);
//            System.out.println(existing.getSteps());
//            labService.save(labDTO);
//        }
//        else
//            returnid = labService.createNewLab(labDTO);
//        System.out.println("return http OK\n"+returnid);
//        List<StepDTO> steps = labDTO.getSteps();
//        for (StepDTO dto: steps) {
//            System.out.println(dto);
//        }
        Lab lab = modelMapper.map(labDTO, Lab.class);
        List<Step> steps = new ArrayList<>();
        for (StepDTO dto: labDTO.getSteps()) {
            Step step = new Step();
            step.setStepNum(dto.getStepNum());
            step.setInstruction(dto.getInstruction());
            stepService.addStep(step);
            steps.add(step);
        }
        lab.setSteps(steps);
        System.out.println(lab);
        labService.saveLab(lab);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_labs", method = RequestMethod.POST)
    public ResponseEntity getLabs() {
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
        return new ResponseEntity(HttpStatus.OK);
//        return map;
    }

}
