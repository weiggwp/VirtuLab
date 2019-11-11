package backend.controller;


import backend.dto.CourseDTO;
import backend.model.Course;
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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.HashMap;
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
    ModelMapper modelMapper;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
    public Map<String, Object> addLab(@RequestBody CourseDTO courseDTO) {
        System.out.println("LabController: ");
        // TODO: check if lab exists, save lab otherwise

        Map<String, Object>  map = new HashMap<>();
        /* In DB, reject request to add course*/
        if (false) {
            map.put("msg", ERRMSG);
            return map;
        }

        /* convert DTO to entity, add to DB */
        map.put("msg", SUCCESS);
        return map;
    }

//    @Bean
//    public ModelMapper modelMapper() {
//        return new ModelMapper();
//    }


//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
//    public ResponseEntity saveLab(@RequestBody LabDTO labDTO) {
//
//        System.out.println(labDTO.getId());
//        System.out.println("lab Controller is called");
//
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
//
//        return new ResponseEntity<>(returnid, HttpStatus.OK);
//    }

}
