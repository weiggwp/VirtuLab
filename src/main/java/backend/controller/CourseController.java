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
public class CourseController {

    private final String ERRMSG = "fail to add course";
    private final String SUCCESS = "success";

    @Autowired
    CourseService courseService;

    @Autowired
    ModelMapper modelMapper;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/add_course", method = RequestMethod.POST)
    public Map<String, Object> addCourse(@RequestBody CourseDTO courseDTO) {
        System.out.println("CourseController: ");

        Map<String, Object>  map = new HashMap<>();
        /* In DB, reject request to add course*/
        if (courseService.courseExists(courseDTO)) {
            map.put("msg", ERRMSG);
            return map;
        }

        /* convert DTO to entity, add to DB */
        Course c = modelMapper.map(courseDTO, Course.class);
        System.out.println(c);
        courseService.addCourse(c);
        map.put("msg", SUCCESS);
        return map;
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
