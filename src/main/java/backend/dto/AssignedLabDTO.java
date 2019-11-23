package backend.dto;

import backend.model.Lab;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class AssignedLabDTO {
    @JsonProperty("labID")
    private long labID;
    @JsonProperty("lab")
    private Lab lab;
    @JsonProperty("dueDate")
    private Date dueDate;
    @JsonProperty("courseID")
    private long courseID;
}
