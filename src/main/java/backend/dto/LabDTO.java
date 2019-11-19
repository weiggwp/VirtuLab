package backend.dto;

import backend.model.Step;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LabDTO {
    @JsonProperty("labID")
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
    @JsonProperty("description")
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<String> getTags() {
        return tags;
    }

    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    @JsonProperty("tags")
    private ArrayList<String> tags;
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
                ", isPublic=" + isPublic +
                ", creator=" + creator +
                ", lastModified=" + lastModified +
                ", steps=" + steps +
                ", tags=" + tagString() +
                '}';
    }
}
