package backend.controller;


import backend.dto.StepDTO;
import backend.dto.UserDTO;
import backend.model.*;
import backend.service.CourseService;
import backend.service.StepService;
import org.modelmapper.ModelMapper;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;

import backend.dto.LabDTO;
import backend.service.LabService;
import backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import backend.dto.CourseDTO;
import backend.service.CourseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import javax.persistence.EntityManager;
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

    @Autowired
    EntityManager em;

    ModelMapper modelMapper = new ModelMapper();


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
    public ResponseEntity saveLab(@RequestBody LabDTO labDTO) {

       // System.out.println("lab Controller is called: save_lab");
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
         //   System.out.println("lab does not exist, creating new lab");
          //  System.out.println("lab is "+labDTO);
            Lab lab = modelMapper.map(labDTO, Lab.class);
            lab.setSteps(steps);

            returnid = labService.createNewLab(lab);
          //  System.out.println("return id is"+returnid +" lab is " +labService.findByLabID(returnid));
            //System.out.println("return id is "+returnid);
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
      //  System.out.println("getting lab for user : "+user);
        if(user==null)
        {
        //    System.out.println("user doesn't exist");

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
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_public_labs", method = RequestMethod.POST)
    public ResponseEntity getPublicLabs() {
        List<Lab> labs = labService.getAllLabs();
        List<Lab> ret = new ArrayList<>();
        for (int i=0; i<labs.size(); i++){
            if (labs.get(i).isPublic()){
                ret.add(labs.get(i));
            }
          //  System.out.println("Lab: "+labs.get(i));
        }
        return new ResponseEntity(ret,HttpStatus.OK);
    }
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_matching_public_labs", method = RequestMethod.POST)
    public ResponseEntity getMatchingPublicLabs(@RequestBody LabDTO labDTO) {
        //System.out.println("labdto is "+labDTO);
        //System.out.println("size is "+labDTO.getTags().size());
        if (labDTO.getTags()==null||labDTO.getTags().size()==0){

            return getPublicLabs();
        }

        List<Lab> labs = labService.getAllLabs();
        List<Lab> ret = new ArrayList<>();
        for (int i=0; i<labs.size(); i++){
            if (labs.get(i).isPublic()&&labs.get(i).getTags()!=null){
                for (int j=0; j<labDTO.getTags().size(); j++){
                    if (labs.get(i).getTags().contains(labDTO.getTags().get(j))){
                        ret.add(labs.get(i));
                        System.out.println("Lab: "+labs.get(i));
                        break;
                    }
                }

            }

        }
        return new ResponseEntity(ret,HttpStatus.OK);
    }


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/publish_lab", method = RequestMethod.POST)
    public ResponseEntity publishLab(@RequestBody LabDTO labDTO){
        try {
            System.out.println("lab is "+labDTO);
            Lab lab = labService.findByLabID(labDTO.getLabID());

            lab.setPublic(!lab.isPublic());
            User user = userService.findByEmail(labDTO.getCreator());
            System.out.println("user is " +user.getFirstName()+user.getLastName());
          //  lab.setCreator(user.getFirstName()+" "+user.getLastName());
            lab.setDescription(labDTO.getDescription());
            lab.setTags(labDTO.getTags());
            labService.saveLab(lab);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_tags", method = RequestMethod.POST)
    public ResponseEntity getTagCount(){
        List<Lab> labs = labService.getAllLabs();
        List<Lab> ret = new ArrayList<>();
        HashMap<String,Integer> map = new HashMap<>();
        for (int i=0; i<labs.size(); i++){
            if (labs.get(i).isPublic()&&labs.get(i).getTags()!=null){
                List<String> tags = labs.get(i).getTags();
                for (int j=0; j<tags.size(); j++){
                    if (map.containsKey(tags.get(j))){
                        map.put(tags.get(j),map.get(tags.get(j))+1);

                    }
                    else map.put(tags.get(j),1);
                }

            }
            //  System.out.println("Lab: "+labs.get(i));
        }

        Object[] vals =  map.keySet().toArray();
        String[] values = new String[vals.length];
        for (int i=0; i<vals.length; i++){
            values[i]=(String)vals[i];
        }
      /*  String[] maxima=new String[5];
        for (int i=0; i<maxima.length; i++){
            maxima[i]="";
        }
        for (int i=0; i<5; i++){
            if (i>=values.length)break;
            int max=-1;
            for (int j=0; j<values.length; j++){
                int n =map.get(values[j]);
                if (n>max&&!contains(maxima,values[j])){
                    maxima[i]=values[j];
                    max=n;
                }
            }
        }*/
        return new ResponseEntity(values,HttpStatus.OK);
    }
    public boolean contains (String[] arr,String s){
        for (int i=0; i<arr.length; i++){
            if (arr[i].equals(s))return true;
        }
        return false;
    }
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/add_lab_class", method = RequestMethod.POST)
    public ResponseEntity addLabToClass(@RequestBody CourseDTO courseDTO) {
        try {
            System.out.println("course dto is "+courseDTO);


            Optional<Course> optcourse = courseService.findCourseByNameOrCode(courseDTO.getCourseNumber(),0);
            Course course = optcourse.get();
            System.out.println("course found was "+course);
            Lab lab = courseDTO.getLabs().get(0);

            for (int i=0; i<course.getLabs().size(); i++)
                if (course.getLabs().get(i).getLabID()==lab.getLabID())
                return new ResponseEntity(HttpStatus.NOT_FOUND);

            course.addLab(lab);
            courseService.addCourse(course);
            System.out.println("course dto is "+courseDTO+ " lab is " + lab);
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }


    @RequestMapping(value = "/del_lab", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity drop(@RequestBody LabDTO labDTO) {
        System.out.println("Lab Controller del operation: ");
        System.out.println("lab to del: " + labDTO);

        long labID = labDTO.getLabID();
        String email = labDTO.getEmail();

        User user = userService.findByEmail(email);
        System.out.println(user);

        Optional<Lab> optional = labService.findLabByLabID(labID);
        if (optional.isPresent()) {
            System.out.println("take out lab");
            Lab lab = optional.get();
            lab.removeLab(); // remove the rows in association table
//            System.out.println(lab.getCourses());
//            lab.getCourses().clear();
//            labService.saveLab(lab);
//            em.getTransaction().begin();
//            em.remove(lab);
//            em.getTransaction().commit();

            user.getLabs().remove(lab);
        }


        labService.deleteById(labID);




        return new ResponseEntity(HttpStatus.OK);
    }




    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/clone_lab", method = RequestMethod.POST)
    public ResponseEntity cloneLab(@RequestBody LabDTO labDTO) {
        try {
            System.out.println("received lab was "+labDTO);
            Lab realLab = labService.findByLabID(labDTO.getLabID());
            System.out.println("Mapped lab to "+realLab);
            List<Step> steps = realLab.getSteps();
            List<Step> listClone = new ArrayList<>();
            for (Step step: steps) {
                Step clone = step.clone();
                stepService.addStep(clone);
                listClone.add(clone);
            }
            Lab labClone = realLab.clone(listClone);
            if (labDTO.getCreator()!=null){
                labClone.setCreator(labDTO.getCreator());
            }
            System.out.println("clone is " +labClone+ " lab is "+realLab);
            long returnid = labService.createNewLab(labClone);
            User instructor = userService.findByEmail(labClone.getCreator());
            instructor.getLabs().add(labClone);
            userService.save(instructor);
            System.out.println("saved "+labService.findByLabID(returnid)+
                    " user is "+userService.findByEmail(realLab.getCreator()));
            return new ResponseEntity(returnid,HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

    }


}
