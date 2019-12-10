package backend.controller;


import backend.dto.*;
import backend.model.*;
import backend.repository.UserRepository;
import backend.service.*;
import org.modelmapper.ModelMapper;
import org.omg.PortableInterceptor.SYSTEM_EXCEPTION;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

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
    CourseLabService courseLabService;

    @Autowired
    CourseService courseService;

    @Autowired
    LabService labService;

    @Autowired
    UserService userService;

    @Autowired
    StepService stepService;

    @Autowired
    EquipmentService equipmentService;

    @Autowired
    UserCourseLabService userCourseLabService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserCourseLabStepService userCourseLabStepService;

    EntityManager em;

    ModelMapper modelMapper = new ModelMapper();


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
    public ResponseEntity<Lab> saveLab(@RequestBody LabDTO labDTO) {

       // System.out.println("lab Controller is called: save_lab");
        System.out.println(labDTO);
        Lab existing = labService.findByLabID(labDTO.getLabID());

        long returnid = -1;
        if (existing != null)
        {
            /* modifying existing lab */
            existing.setName(labDTO.getName());

            existing.setLastModified(labDTO.getLastModified());
            /* match the lab equipments */
            mergeLabEquips(labDTO.getEquipments(), existing.getEquipments());
            /* match the step equipments */
            mergeStep(labDTO.getStepsDTO(), existing.getSteps());

//          existing.setEquipments(equipments);
            labService.saveLab(existing);

            return new ResponseEntity<Lab>(existing, HttpStatus.OK);

        }
        else {
            List<Step> steps = new ArrayList<>();
            for (StepDTO dto: labDTO.getStepsDTO()) {
                Step step = new Step();
                step.setStepNum(dto.getStepNum());
                step.setInstruction(dto.getInstruction());
                step.setEquipments(mapEquipmentDTO(dto.getEquipments()));
                stepService.addStep(step);
                steps.add(step);
            }

            List<Equipment> equipments = mapEquipmentDTO(labDTO.getEquipments());
            //  System.out.println("lab does not exist, creating new lab");
            //  System.out.println("lab is "+labDTO);
            Lab lab = modelMapper.map(labDTO, Lab.class);
            lab.setSteps(steps);
            lab.setEquipments(equipments);
            lab.setOpen(0);
            returnid = labService.createNewLab(lab);
            //  System.out.println("return id is"+returnid +" lab is " +labService.findByLabID(returnid));
            //  System.out.println("return id is "+returnid);
            User instructor = userService.findByEmail(labDTO.getCreator());

            instructor.getLabs().add(lab);
            userService.save(instructor);
            return new ResponseEntity<Lab>(lab, HttpStatus.OK);
        }

//
//        return new ResponseEntity<>(returnid, HttpStatus.OK);
    }

    private void mergeStep(List<StepDTO> stepsDTO, List<Step> steps){

        steps.sort(new Comparator<Step>() {
            @Override
            public int compare(Step o1, Step o2) {
                if (o1.getStepNum() > o2.getStepNum()) return 1;
                else if (o1.getStepNum() < o2.getStepNum()) return -1;
                return 0;
            }
        });

        stepsDTO.sort(new Comparator<StepDTO>() {
            @Override
            public int compare(StepDTO o1, StepDTO o2) {
                if (o1.getStepNum() > o2.getStepNum()) return 1;
                else if (o1.getStepNum() < o2.getStepNum()) return -1;
                return 0;
            }
        });

        /* update all the existing steps */
        for (int i = 0; i < steps.size(); i ++) {
            Step step = steps.get(i);
            StepDTO dto = stepsDTO.get(i);
            System.out.println(step);
            System.out.println(dto);
            System.out.println(step.getStepID() == dto.getStepID());

            step.setStepNum(dto.getStepNum());
            step.setInstruction(dto.getInstruction());

            List<Equipment> stepEquips = step.getEquipments();
            List<EquipmentDTO> equipsDTO = dto.getEquipments();
            mergeStepEquips(equipsDTO, stepEquips, step);
        }

        /* new steps added */
        if (stepsDTO.size() + 1 > steps.size()) {
            for (int i = steps.size(); i < stepsDTO.size(); i ++) {
                System.out.println("new step " + stepsDTO.get(i).getStepNum());
                StepDTO dto = stepsDTO.get(i);
                Step step = new Step();
                step.setStepNum(dto.getStepNum());
                step.setInstruction(dto.getInstruction());
                step.setEquipments(mapEquipmentDTO(dto.getEquipments()));
                stepService.addStep(step);
                steps.add(step);
            }
        }
    }

    private void mergeStepEquips(List<EquipmentDTO> equipsDTO, List<Equipment> stepEquips, Step step) {
        for (int i = 0; i < equipsDTO.size(); i ++) {
            boolean newEquip = true;
            for (int j = 0; j < stepEquips.size(); j ++) {
                Equipment equip = stepEquips.get(j);
                EquipmentDTO dto = equipsDTO.get(i);
//                System.out.println(equip.getEquipmentID());
//                System.out.println(dto.getEquipmentID());
                /* same ID, same equip get the state of the dto */
                //equip.getEquipmentID() == dto.getEquipmentID()
                System.out.println(equip.getEquipmentID() + " == " + dto.getEquipmentID());
                System.out.println(equip.getEquipmentID() == dto.getEquipmentID());
                if (equip.getEquipmentID() == dto.getEquipmentID()) {
                    System.out.println("same equip");
                    newEquip = false;
                    copyVals(equip, dto);
                    equipmentService.saveEquipment(equip);
                    // TODO: copy the items (i.e. water, alcohol, or other valid liquids)
                }

            }
            if (newEquip) {
                System.out.println("new equip in step: creating creating equip");
                Equipment equipment = modelMapper.map(equipsDTO.get(i), Equipment.class);
                step.getEquipments().add(equipment);
            }
        }
    }

//    private void mergeStepEquips2(List<EquipmentDTO> equipsDTO, List<Equipment> stepEquips, Step step) {
//        for (int i = 0; i < stepEquips.size(); i ++) {
//            boolean drop = true;
//            for (int j = 0; j < equipsDTO.size(); j ++) {
//                Equipment equip = stepEquips.get(i);
//                EquipmentDTO dto = equipsDTO.get(j);
////                System.out.println(equip.getEquipmentID());
////                System.out.println(dto.getEquipmentID());
//                //equip.getEquipmentID() == dto.getEquipmentID()
//                System.out.println(equip.getEquipmentID() + " == " + dto.getEquipmentID());
//                System.out.println(equip.getEquipmentID() == dto.getEquipmentID());
//                if (equip.getEquipmentID() == dto.getEquipmentID()) {
//                    System.out.println("same equip");
//                    drop = false;
//                    // TODO: copy the items (i.e. water, alcohol, or other valid liquids)
//                }
//
//            }
//            if (drop) {
//                System.out.println("equip no longer exists in step: ");
//                for (int k = 0; k < stepEquips.size(); k ++) {
//                    if (stepEquips.get(i).getEquipmentID() ==)
//                }
//                equipmentService.deleteById();
//            }
//        }
//    }

    private void mergeLabEquips(List<EquipmentDTO> equipsDTO, List<Equipment> currentEquips) {
        for (int i = 0; i < equipsDTO.size(); i ++) {
            for (int j = 0; j < currentEquips.size(); j ++) {
                Equipment equip = currentEquips.get(i);
                EquipmentDTO dto = equipsDTO.get(j);
//                System.out.println(dto);
//                System.out.println(equip.getEquipmentID());


                /* same ID, same equip get the state of the dto */
                if (equip.getEquipmentID() == dto.getEquipmentID()) {
                    copyVals(equip, dto);
                }
            }
        }
    }

    private void copyVals(Equipment equip, EquipmentDTO dto) {
        equip.setX(dto.getX());
        equip.setY(dto.getY());
        equip.setCapacity(dto.getCapacity());
        equip.setAmount(dto.getAmount());
        equip.setWeight(dto.getWeight());
        equip.setName(dto.getName());
        equip.setImage(dto.getImage());
        equip.setType(dto.getType());
        equip.setDisabled(dto.getDisabled());
    }

    private List<Equipment> mapEquipmentDTO(List<EquipmentDTO> DTO)
    {
        List<Equipment> equipments = new ArrayList<>();
        for (EquipmentDTO dto: DTO) {
            Equipment equipment = modelMapper.map(dto, Equipment.class);
            equipmentService.saveEquipment(equipment);
            equipments.add(equipment);
        }
        return equipments;
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
            if (labs.get(i).getOpen() > 0){
                ret.add(labs.get(i));
            }
            System.out.println("Lab: "+labs.get(i));
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
            if (labs.get(i).getOpen() > 0&&labs.get(i).getTags()!=null){
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
            System.out.println("lab is "+lab);
            if (lab.getOpen()==1){
                lab.setOpen(0);
                lab.setDescription("");
                lab.setTags(null);
                labService.saveLab(lab);
                return new ResponseEntity(HttpStatus.OK);
            }
            lab.setOpen(1);
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
            if (labs.get(i).getOpen()>0&&labs.get(i).getTags()!=null){
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
            System.out.println("CALLING ADD LAB CLASS");
            System.out.println("course dto is "+courseDTO);
            courseDTO.setCode(courseDTO.getCourseNumber());

//            Optional<Course> optcourse = courseService.findCourseByNameOrCode(courseDTO.getCourseNumber(),0);
//            Course course = optcourse.get();
//            System.out.println("course found was "+course);
//            Lab lab = courseDTO.getLabs().get(0);
//
//            for (int i=0; i<course.getLabs().size(); i++)
//                if (course.getLabs().get(i).getLabID()==lab.getLabID())
//                return new ResponseEntity(HttpStatus.NOT_FOUND);
//
//            course.addLab(lab);
//            courseService.addCourse(course);
//            System.out.println("course dto is "+courseDTO+ " lab is " + lab);
//            return new ResponseEntity(HttpStatus.OK);

            long courseID = courseDTO.getCourseID();
            Optional<Course> optionalCourse = courseService.findCourseByNameOrCode(courseDTO.getCourseNumber(),0);
            if (optionalCourse.isPresent()) {

                Course course = optionalCourse.get();
                System.out.println(course);
                Lab lab = courseDTO.getLabs().get(0);

                // check if lab is already in the course
                for (CourseLab courseLab: course.getCourseLabList()) {
                    if (courseLab.getLab().getLabID() == lab.getLabID()) {
                        return new ResponseEntity(HttpStatus.NOT_FOUND);
                    }
                }
                CourseLab courseLab = new CourseLab();
                courseLab.setCourse(course);
                courseLab.setLab(lab);
                courseLab.setDate(courseDTO.getDate());
                System.out.println(courseLab);
                course.getCourseLabList().add(courseLab);
                lab.getCourseLabList().add(courseLab);
//                courseLabService.saveOrUpdate(courseLab);
                courseService.addCourse(course);

                // add to UserCourseLab
                for(UserCourse userCourse: course.getUserCourseList()){
                    User user = userCourse.getUser();
                    if(user.getRole().toLowerCase().equals("student")) {
                        if (!userCourseLabService.exists(user, course, lab)) {
                            UserCourseLab userCourseLab = new UserCourseLab(user, course, lab);
                            user.getUserCourseLabList().add(userCourseLab);
                        }
                        userService.save(user);
                    }
                }

                for (UserCourseLab userCourseLab: course.getUserCourseLabList()) {
                    Lab l = userCourseLab.getLab();
                    for (Step step: l.getSteps()) {
                        if (!userCourseLabStepService.exists(userCourseLab, step)) {
                            UserCourseLabStep userCourseLabStep = new UserCourseLabStep();
                            userCourseLabStep.setStep(step);
                            userCourseLabStep.setUserCourseLab(userCourseLab);
                            userCourseLab.getUserCourseLabStepList().add(userCourseLabStep);
                            userCourseLabStepService.save(userCourseLabStep);
                        }
                    }
                }

                System.out.println("LEAVING ADD LAB CLASS");
                return new ResponseEntity(HttpStatus.OK);

            }
            System.out.println("LEAVING ADD LAB CLASS");
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


            List<UserCourseLab> userCourseLabList = new ArrayList<>(lab.getUserCourseLabList());
            for (Iterator<UserCourseLab> it = userCourseLabList.iterator(); it.hasNext();) {
                UserCourseLab userCourseLab = it.next();
                System.out.println("hi " + userCourseLab.getLab().getName());
                if (userCourseLab.getUser().getId() == user.getId() &&
                        userCourseLab.getLab().getLabID() == labID){
                    it.remove();
                    userCourseLabService.delAssociateion(userCourseLab.getUserCourseLabID());
                }
                labService.saveLab(lab);
            }

//            System.out.println(lab.getCourses());
//            lab.getCourses().clear();
//            labService.saveLab(lab);
//            em.getTransaction().begin();
//            em.remove(lab);
//            em.getTransaction().commit();

            user.getLabs().remove(lab);
            labService.deleteById(labID);
        }



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

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/page_lab", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> getPageLab(@RequestBody PageRequestDTO pageRequestDTO) {
        try {
            System.out.println("pageDTO: "+ pageRequestDTO);
            int page = pageRequestDTO.getPageNum() - 1;
            int size = pageRequestDTO.getPerPage();
            Page<Lab> pageLab= labService.pageAllPublicLabs(page, size);
            pageLab.forEach(lab -> System.out.println(lab));
            int totalPages = pageLab.getTotalPages();
            long totalElements = pageLab.getTotalElements();

            System.out.println("totalPages: " + totalPages);
            System.out.println("totalElements: " + totalElements);


            HashMap<String, Object> map = new HashMap<>();
            map.put("labs", pageLab);
            map.put("totalPages", totalPages);

            return map;

//            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();

        }
        return null;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/page_lab_tags", method = RequestMethod.POST)
    @ResponseBody
    public HashMap<String, Object> pageByTags(@RequestBody PageRequestDTO pageRequestDTO) {
        try {
            System.out.println("pageDTO: "+ pageRequestDTO);
            int page = pageRequestDTO.getPageNum() - 1;
            int size = pageRequestDTO.getPerPage();
            Page<Lab> pageLab= labService.pageLabsByTags(page, size);
            pageLab.forEach(lab -> System.out.println(lab));
            int totalPages = pageLab.getTotalPages();
            long totalElements = pageLab.getTotalElements();

            System.out.println("totalPages: " + totalPages);
            System.out.println("totalElements: " + totalElements);


            HashMap<String, Object> map = new HashMap<>();
            map.put("labs", pageLab);
            map.put("totalPages", totalPages);

            return map;

//            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();

        }
        return null;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/set_completion", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity setCompletion(@RequestBody CourseDTO courseDTO) {
        System.out.println("LabController set completion for a lab: "+courseDTO);
        // send the lab you want to send the date in a list
        long labID = courseDTO.getLabs().get(0).getLabID();

        String email = courseDTO.getEmail();
        User user = userService.findByEmail(email);
        long userID = user.getId();


        Optional<Course> optional = courseService.findCourseByNameOrCode(courseDTO.getCode(),0);
        if (optional.isPresent()) {

            Course course = optional.get();
            long courseID = course.getCourseID();
            for (UserCourseLab userCourseLab: user.getUserCourseLabList()) {
                if (userCourseLab.getLab().getLabID() == labID &&
                    userCourseLab.getCourse().getCourseID() == courseID &&
                        userCourseLab.getUser().getId() == userID)
                    userCourseLab.setComplete(1 );
            }

            userService.save(user);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_lab", method = RequestMethod.POST)
    public ResponseEntity getLab(@RequestBody LabDTO labDTO) {
        try {
            System.out.println("lab is " + labDTO);
            Optional<Lab> optional = labService.findLabByLabID(labDTO.getLabID());
            if (optional.isPresent()) {
                Lab lab = optional.get();
                System.out.println(lab);
                return new ResponseEntity(lab, HttpStatus.OK);
            } else {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        }
        catch (Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

}
