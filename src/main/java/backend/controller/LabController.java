package backend.controller;


import backend.dto.*;
import backend.model.*;
import backend.repository.LabRepository;
import backend.repository.StepRepository;
import backend.repository.UserRepository;
import backend.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import backend.service.CourseService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import javax.persistence.EntityManager;

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

    @Autowired
    StepRepository stepRepository;

    @Autowired
    LabRepository labRepository;

    EntityManager em;

    ModelMapper modelMapper = new ModelMapper();


    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/save_lab", method = RequestMethod.POST)
    public ResponseEntity saveLab(@RequestBody LabDTO labDTO) {

        // System.out.println("lab Controller is called: save_lab");
//        System.out.println(labDTO);
        Lab existing = labService.findByLabID(labDTO.getLabID());


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


        long returnid = -1;
        if (existing != null)
        {
            existing.setName(labDTO.getName());

            existing.setLastModified(labDTO.getLastModified());
            existing.setSteps(steps);
            existing.setEquipments(equipments);
            existing.setLastModified(new Date());
            labService.saveLab(existing);

        }
        else {
            //   System.out.println("lab does not exist, creating new lab");
            //  System.out.println("lab is "+labDTO);
            Lab lab = modelMapper.map(labDTO, Lab.class);
            lab.setSteps(steps);
            lab.setEquipments(equipments);
            lab.setOpen(0);
            lab.setLastModified(new Date());
            returnid = labService.createNewLab(lab);
            //  System.out.println("return id is"+returnid +" lab is " +labService.findByLabID(returnid));
            //System.out.println("return id is "+returnid);
            User instructor = userService.findByEmail(labDTO.getCreator());

            instructor.getLabs().add(lab);
            userService.save(instructor);
        }


        return new ResponseEntity<>(returnid, HttpStatus.OK);
    }

    private List<Equipment> mapEquipmentDTO(List<EquipmentDTO> DTO)
    {
        List<Equipment> equipments = new ArrayList<>();
        for (EquipmentDTO dto: DTO) {
//            Equipment equipment = modelMapper.map(dto, Equipment.class);
            Equipment equipment1 = new Equipment();
            copyVals(equipment1, dto);
            equipmentService.saveEquipment(equipment1);
            equipments.add(equipment1);
        }
        return equipments;
    }
    public void sort_steps(List<Step> steps)
    {
        Collections.sort(steps, (o1, o2) -> {
            long first = o1.getStepNum();
            long second = o2.getStepNum();
            if(first>second)
                return 1;
            else {
                if (first == second)
                    return 0;
                return -1;
            }
        });
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
        equip.setSize(dto.getSize());
        equip.setColor(dto.getColor());
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/get_labs", method = RequestMethod.POST)
    public ResponseEntity getLabs(@RequestBody PageRequestDTO dto) {
        System.out.println("LabController get_labs is called: ");

        User user = userService.findByEmail(dto.getEmail());
        if(user == null)
        {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
//        List<Lab> labs = user.getLabs();

        int size = dto.getPerPage();
        int pageNum = dto.getPageNum();
//        System.out.println(pageNum);
//        System.out.println(size);

        Page<Lab> pageLabs = labService.pagePrivateLabs(user, pageNum - 1, size);
//        System.out.println("TotalElements: " + pageLabs.getTotalElements());
//        System.out.println("Total pages: " + pageLabs.getTotalPages());

        List<Lab> labs = new ArrayList<>();
        PageRequestDTO returnDTO = new PageRequestDTO();
        for (Lab lab: pageLabs) {
            labs.add(lab);
//            System.out.println(lab.getName());
        }
        returnDTO.setLabs(labs);
        returnDTO.setTotalElements(pageLabs.getTotalElements());
        returnDTO.setTotalPages(pageLabs.getTotalPages());

        if(labs!=null)
        {
            for (Lab lab : labs)
            {
                sort_steps(lab.getSteps());
            }

            return new ResponseEntity<>(returnDTO, HttpStatus.OK);
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
//            System.out.println("Lab: "+labs.get(i));
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
//                        System.out.println("Lab: "+labs.get(i));
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
//            System.out.println("lab is "+labDTO);
            Lab lab = labService.findByLabID(labDTO.getLabID());
//            System.out.println("lab is "+lab);
            if (lab.getOpen()==1){
                lab.setOpen(0);
                lab.setDescription("");
                lab.setTags(null);
                labService.saveLab(lab);
                return new ResponseEntity(HttpStatus.OK);
            }
            lab.setOpen(1);
            User user = userService.findByEmail(labDTO.getCreator());
//            System.out.println("user is " +user.getFirstName()+user.getLastName());
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
//            System.out.println("CALLING ADD LAB CLASS");
//            System.out.println("course dto is "+courseDTO);
            courseDTO.setCode(courseDTO.getCourseNumber());

            long courseID = courseDTO.getCourseID();
            Optional<Course> optionalCourse = courseService.findCourseByNameOrCode(courseDTO.getCourseNumber(),0);
            if (optionalCourse.isPresent()) {

                Course course = optionalCourse.get();
//                System.out.println(course);
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
//                System.out.println(courseLab);
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

//                System.out.println("LEAVING ADD LAB CLASS");
                return new ResponseEntity(HttpStatus.OK);

            }
//            System.out.println("LEAVING ADD LAB CLASS");
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
//        System.out.println("Lab Controller del operation: ");
//        System.out.println("lab to del: " + labDTO);

        long labID = labDTO.getLabID();
        String email = labDTO.getEmail();

        User user = userService.findByEmail(email);
//        System.out.println(user);

        Optional<Lab> optional = labService.findLabByLabID(labID);
        if (optional.isPresent()) {
//            System.out.println("take out lab");
            Lab lab = optional.get();
            lab.removeLab(); // remove the rows in association table


            List<UserCourseLab> userCourseLabList = new ArrayList<>(lab.getUserCourseLabList());
            for (Iterator<UserCourseLab> it = userCourseLabList.iterator(); it.hasNext();) {
                UserCourseLab userCourseLab = it.next();
//                System.out.println("hi " + userCourseLab.getLab().getName());
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
//            System.out.println("received lab was "+labDTO);
            Lab realLab = labService.findByLabID(labDTO.getLabID());
//            System.out.println("Mapped lab to "+realLab);
            List<Step> steps = realLab.getSteps();
            List<Equipment> equips = new LinkedList<>();
            for (Equipment equip: realLab.getEquipments()){
                equips.add(equip.clone());
            }
            List<Step> listClone = new ArrayList<>();
            for (Step step: steps) {
                Step clone = step.clone();
                stepService.addStep(clone);
                listClone.add(clone);
            }
            Lab labClone = realLab.clone(listClone);
            labClone.setEquipments(equips);
            if (labDTO.getCreator()!=null){
                labClone.setCreator(labDTO.getCreator());
            }

            long returnid = labService.createNewLab(labClone);
            User instructor = userService.findByEmail(labClone.getCreator());
            instructor.getLabs().add(labClone);
            userService.save(instructor);
//            System.out.println("saved "+labService.findByLabID(returnid)+
//                    " user is "+userService.findByEmail(realLab.getCreator()));
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
//            System.out.println("pageDTO: "+ pageRequestDTO);
            int page = pageRequestDTO.getPageNum() - 1;
            int size = pageRequestDTO.getPerPage();
            Page<Lab> pageLab= labService.pageAllPublicLabs(page, size);
            pageLab.forEach(lab -> System.out.println(lab));
            int totalPages = pageLab.getTotalPages();
            long totalElements = pageLab.getTotalElements();

//            System.out.println("totalPages: " + totalPages);
//            System.out.println("totalElements: " + totalElements);


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
            boolean found=false;
            System.out.println("course is "+course);
            long courseID = course.getCourseID();
            for (UserCourseLab userCourseLab: user.getUserCourseLabList()) {
                if (userCourseLab.getLab().getLabID() == labID &&
                    userCourseLab.getCourse().getCourseID() == courseID &&
                        userCourseLab.getUser().getId() == userID) {
                    found=true;
                    if (userCourseLab.getComplete()==1)continue;
                    userCourseLab.setComplete(1);
                    TimeZone.setDefault(TimeZone.getTimeZone("EST"));


                    Date date2 = new Date();
                    userCourseLab.setSubmittedDate(new Date());
                }
            }
            userService.save(user);
        }
        else{
            System.out.println("NOT FOUND");
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
                sort_steps(lab.getSteps());
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
