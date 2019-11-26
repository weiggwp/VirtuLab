package backend.model;


import javax.persistence.*;
import java.util.*;

import backend.dto.StepDTO;
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
    private boolean isPublic;

    private String creator;
    private Date lastModified;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List <Equipment> equipments = new ArrayList<>();

    public List<Equipment> getEquipments() {
        return equipments;
    }

    public void setEquipments(List<Equipment> equipments) {
        this.equipments = equipments;
    }

    @OneToMany(cascade = CascadeType.PERSIST)
//    @JoinTable(name = "lab_step", joinColumns = {@JoinColumn(name = "stepID")})
    private List<Step> steps = new ArrayList<>();
//    private Step steps;

//    @ManyToMany
//    @JoinTable(name = "lab_equipment", joinColumns = {@JoinColumn(name = "labID")},
//            inverseJoinColumns = {@JoinColumn(name = "equipmentID")})
//    private List<Equipment> equipments;


    public Lab(String name, String description, boolean isPublic, String creator, Date lastModified, List<Step> steps) {
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.creator = creator;
        this.lastModified = lastModified;
        this.steps = new ArrayList<>();
    }

    public Lab() {
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

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    @Override
    public String toString() {
        return "Lab{" +
                "labID=" + labID +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", isPublic=" + isPublic +
                ", creator=" + creator +
                ", lastModified=" + lastModified +
                ", steps=" + steps +
                '}';
    }
}
