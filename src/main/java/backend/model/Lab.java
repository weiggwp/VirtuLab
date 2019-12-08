package backend.model;


import javax.persistence.*;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;
import javax.persistence.*;
import java.util.List;


@Entity
public class Lab {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long labID;
    private String name;
    private String description;
    private int open;
    private String creator;
    private Date lastModified;
    private ArrayList<String> tags=new ArrayList<>();
    @OneToMany(cascade = CascadeType.PERSIST)
//    @JoinTable(name = "lab_step", joinColumns = {@JoinColumn(name = "stepID")})
    private List<Step> steps = new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST)
    private List <Equipment> equipments = new ArrayList<>();

    public List<Equipment> getEquipments() {
        return equipments;
    }
    @OneToMany(mappedBy = "lab", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private List<CourseLab> courseLabList = new ArrayList<>();

    @OneToMany(mappedBy = "lab", orphanRemoval = true, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<UserCourseLab> userCourseLabList = new ArrayList<>();


    @JsonIgnore
    @ManyToMany(mappedBy = "labs")
    private List<Course> courses;


    public Lab clone(List<Step> lis){
        return new Lab(name+" (CLONE)",description,creator,lastModified,lis, new ArrayList<String>());
    }


    public void setEquipments(List<Equipment> equipments) {
        this.equipments = equipments;
    }

//    private Step steps;

//    @ManyToMany
//    @JoinTable(name = "lab_equipment", joinColumns = {@JoinColumn(name = "labID")},
//            inverseJoinColumns = {@JoinColumn(name = "equipmentID")})
//    private List<Equipment> equipments;


    public Lab(String name, String description, int open, String creator, Date lastModified, List<Step> steps) {
        this.name = name;
        this.description = description;
        this.open = open;
        this.creator = creator;
        this.lastModified = lastModified;
        this.steps = new ArrayList<>();
        this.tags=new ArrayList<>();
    }

    public Lab(String name, String description,  String creator, Date lastModified, List<Step> steps,
               ArrayList<String> tags) {
        this.name = name;
        this.description = description;
        this.open = 0;
        this.creator = creator;
        this.lastModified = lastModified;
        this.steps = steps;
        this.tags=tags;
    }



    public Lab() {
    }
    public ArrayList<String> getTags() {
        return tags;
    }

    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    public long getLabID() {
        return labID;
    }

    public void setLabID(long labID) {
        this.labID = labID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public Lab(long labID, String name){
        this.name=name;
        this.labID=labID;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CourseLab> getCourseLabList() {
        return courseLabList;
    }

    public void setCourseLabList(List<CourseLab> courseLabList) {
        this.courseLabList = courseLabList;
    }

    public List<UserCourseLab> getUserCourseLabList() {
        return userCourseLabList;
    }

    public void setUserCourseLabList(List<UserCourseLab> userCourseLabList) {
        this.userCourseLabList = userCourseLabList;
    }

    public int getOpen() {
        return open;
    }

    public void setOpen(int open) {
        this.open = open;
    }

    @PreRemove
    public void removeLab(){
        for (Course c: courses) {
            c.getLabs().remove(this);
        }
        this.getCourses().clear();
    }

    private String tagString(){
        if (tags==null){
            return "None";
        }
        String s ="";
        for (int i=0; i<tags.size();i++){
            s+=tags.get(i)+", ";
        }
        return s;
    }


    @Override
    public String toString() {
        return "Lab{" +
                "labID=" + labID +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", isPublic=" + open +
                ", creator=" + creator +
                ", lastModified=" + lastModified +
                ", steps=" + steps +
                ", tags=" + tagString() +
                '}';
    }
}
