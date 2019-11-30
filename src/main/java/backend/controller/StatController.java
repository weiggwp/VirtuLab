package backend.controller;

import backend.dto.CourseDTO;
import backend.dto.UserDTO;
import backend.model.Course;
import backend.model.User;
import backend.model.UserCourseLab;
import backend.service.UserService;
import backend.util.Statistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


// TODO: Dont' know what stats are needed yet. Add later
public class StatController {


    @Autowired
    UserService userService;

//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/student_complete_rate", method = RequestMethod.POST)
//    @ResponseBody
//    public ResponseEntity studentCompletion(@RequestBody UserDTO userDTO) {
//        System.out.println("StatController student completion rate: ");
//
//        String email = userDTO.getEmail_address();
//        User user = userService.findByEmail(email);
//
//        double[] stats;
//        if (user.getRole().equals("student")) {
//            stats = Statistic.findCompletionStats(user);
//        }
//
//        /* stats[0] = finish percentage */
//        /* stats[1] = 1 - stats[0] */
//
//
//    }
}
