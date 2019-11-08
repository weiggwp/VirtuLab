package backend.controller;


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
import java.util.Map;

@Controller
@CrossOrigin(origins = "*")
public class LabController {

    private final String ERRMSG = "fail to add lab";
    private final String SUCCESS = "success";

    @Autowired
    CourseService courseService;

    @Autowired
    ModelMapper modelMapper;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/add_lab", method = RequestMethod.POST)
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
}
