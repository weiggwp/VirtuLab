package backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class UserCourseLabStepDTO {

    @NotEmpty
    @NotNull
    private String email;
    @NotEmpty
    @NotNull
    private long courseID;
    @NotEmpty
    @NotNull
    private long stepID;
    @NotEmpty
    @NotNull
    private long labID;
    @NotEmpty
    @NotNull
    private int tries;

    private String courseCode;

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public UserCourseLabStepDTO() {
    }

    public UserCourseLabStepDTO(@NotEmpty @NotNull String email, @NotEmpty @NotNull long courseID,
                                @NotEmpty @NotNull long stepID, @NotEmpty @NotNull long labID,
                                @NotEmpty @NotNull int tries) {
        this.email = email;
        this.courseID = courseID;
        this.stepID = stepID;
        this.labID = labID;
        this.tries = tries;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getCourseID() {
        return courseID;
    }

    public void setCourseID(long courseID) {
        this.courseID = courseID;
    }

    public long getStepID() {
        return stepID;
    }

    public void setStepID(long stepID) {
        this.stepID = stepID;
    }

    public long getLabID() {
        return labID;
    }

    public void setLabID(long labID) {
        this.labID = labID;
    }

    public int getTries() {
        return tries;
    }

    public void setTries(int tries) {
        this.tries = tries;
    }
}
