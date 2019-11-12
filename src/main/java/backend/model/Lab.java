package backend.model;


import javax.persistence.*;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
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

    private long instructorID;
    private Date lastModified;

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

    @OneToMany(cascade = CascadeType.PERSIST)
//    @JoinTable(name = "lab_step", joinColumns = {@JoinColumn(name = "stepID")})
    private List<Step> steps = new ArrayList<>();
//    private Step steps;

//    @ManyToMany
//    @JoinTable(name = "lab_equipment", joinColumns = {@JoinColumn(name = "labID")},
//            inverseJoinColumns = {@JoinColumn(name = "equipmentID")})
//    private List<Equipment> equipments;


    public Lab(String name, String description, boolean isPublic, long instructorID, Date lastModified, List<Step> steps) {
        this.name = name;
        this.description = description;
        this.isPublic = isPublic;
        this.instructorID = instructorID;
        this.lastModified = lastModified;
        this.steps = new ArrayList<>();
    }

    public Lab() {
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
                ", instructorID=" + instructorID +
                ", lastModified=" + lastModified +
                ", steps=" + steps +
                '}';
    }
}
