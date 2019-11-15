package backend.dto;

import backend.model.Step;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public class LabDTO {
    @JsonProperty("lab_id")
    private long labID;

    public long getLabID() {
        return labID;
    }

    public void setLabID(long labID) {
        this.labID = labID;
    }

    @NotNull
    @NotEmpty
    @JsonProperty("lab_name")
    private String name;

    @NotNull
    @NotEmpty
    private Date lastModified;
    @NotNull
    @NotEmpty
    @JsonProperty("author")
    private String creator;
//    @NotNull
//    @NotEmpty
//    private String password;
    @NotNull
    @NotEmpty
    private List<StepDTO> steps;
    @JsonProperty("is_public")
    private boolean isPublic;



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
