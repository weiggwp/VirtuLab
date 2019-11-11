package backend.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashMap;
import java.util.List;


@Entity
public class Lab {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long labID;
    private String name;
    private long instructorID;
    private Date lastModified;

    @ManyToMany
    @JoinTable(name = "lab_step", joinColumns = {@JoinColumn(name = "labID")},
            inverseJoinColumns = {@JoinColumn(name = "stepID")})
    private List<Step> steps;
//    private Step steps;

//    @ManyToMany
//    @JoinTable(name = "lab_equipment", joinColumns = {@JoinColumn(name = "labID")},
//            inverseJoinColumns = {@JoinColumn(name = "equipmentID")})
//    private List<Equipment> equipments;

    private String description;
    private boolean isPublic;


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



    public Lab(String name, long instructorID, Date lastModified, List<Step> steps) {
        this.name = name;
        this.instructorID = instructorID;
        this.lastModified = lastModified;
        this.steps = steps;
    }

    public Lab() {
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

    public long getInstructorID() {
        return instructorID;
    }

    public void setInstructorID(long instructorID) {
        this.instructorID = instructorID;
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

    public long getLabID()
    {
        return this.labID;
    }




}
