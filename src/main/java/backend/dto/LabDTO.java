package backend.dto;

import backend.model.Instructor;
import backend.model.Step;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

public class LabDTO {

    @NotNull
    @NotEmpty
    private long id;

    @NotNull
    @NotEmpty
    private String name;
    @NotNull
    @NotEmpty
    private Date lastModified;
    @NotNull
    @NotEmpty
    private long instructorID;
//    @NotNull
//    @NotEmpty
//    private String password;
    private StepDTO steps;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public long getInstructorID() {
        return instructorID;
    }

    public void setInstructorID(long instructorID) {
        this.instructorID = instructorID;
    }

    public StepDTO getSteps() {
        return steps;
    }

    public void setSteps(StepDTO steps) {
        this.steps = steps;
    }
}
