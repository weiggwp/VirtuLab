package backend.dto;

import backend.model.Step;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public class LabDTO {

    private long labID;

    public long getLabID() {
        return labID;
    }

    public void setLabID(long labID) {
        this.labID = labID;
    }

    @NotNull
    @NotEmpty
    private String name;

    @NotNull
    @NotEmpty
    private Date lastModified;
    @NotNull
    @NotEmpty
    private String creator;
//    @NotNull
//    @NotEmpty
//    private String password;
    @NotNull
    @NotEmpty
    private List<StepDTO> steps;


//    public long getId() {
//        return id;
//    }
//
//    public void setId(long id) {
//        this.id = id;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public List<StepDTO> getSteps() {
        return steps;
    }

    public void setSteps(List<StepDTO> steps) {
        this.steps = steps;
    }


    @Override
    public String toString() {
        return "LabDTO{" +
                "id=" + labID +
                ", name='" + name + '\'' +
                ", lastModified=" + lastModified +
                ", creator=" + creator +
                ", steps=" + steps +
                '}';
    }
}
