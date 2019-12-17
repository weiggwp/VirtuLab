package backend.dto;

import backend.model.Equipment;
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
    @NotNull
    @NotEmpty
    @JsonProperty("lab_name")
    private String name;
    @JsonProperty("description")
    private String description;
    @JsonProperty("email")
    private String email;
    @NotNull
    @NotEmpty
    private List<StepDTO> stepsDTO;

    @NotNull
    @NotEmpty
    @JsonProperty("steps")
    private List<Step> steps;

    private Date date;
    @JsonProperty("complete")
    private boolean complete;


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


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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

    @JsonProperty("open")
    private int open;

    public int getOpen() {
        return open;
    }


    private List<EquipmentDTO> equipments;
    private List<Equipment> returnEquips;
    public List<EquipmentDTO> getEquipments() {
        return equipments;
    }

    public List<Equipment> getReturnEquips() {
        return returnEquips;
    }

    public void setReturnEquips(List<Equipment> returnEquips) {
        this.returnEquips = returnEquips;
    }

    public void setEquipments(List<EquipmentDTO> equipments) {
        this.equipments = equipments;}

    public void setOpen(int open) {
        this.open = open;
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

    public @NotNull @NotEmpty List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    public boolean isComplete() {
        return complete;
    }

    public void setComplete(boolean complete) {
        this.complete = complete;
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
        return "LabDTO{" +
                "labID=" + labID +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", email='" + email + '\'' +
                ", tags=" + tags +
                ", lastModified=" + lastModified +
                ", creator='" + creator + '\'' +
                ", steps=" + stepsDTO +
                ", equipments=" + equipments+
                ", isPublic=" + open +
                ", completed=" + complete +
                '}';
    }

    public List<StepDTO> getStepsDTO() {
        return stepsDTO;
    }

    public void setStepsDTO(List<StepDTO> stepsDTO) {
        this.stepsDTO = stepsDTO;
    }
}