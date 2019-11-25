package backend.dto;


import backend.model.Lab;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class CourseDTO {

    @JsonProperty("course_id")
    private long courseID;
    @JsonProperty("email")
    private String email;
    @JsonProperty("course_name")
    private String courseName;
    @JsonProperty("course_number")
    private String courseNumber;
    @JsonProperty("description")
    private String courseDescription;
    @JsonProperty("code")
    private String code;
    @JsonProperty("labs")
    private List<Lab> labs = new ArrayList<Lab>();
    private List<LabDTO> labDTOS = new ArrayList<>();
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


//    private int courseEnrollment;
    public List<Lab> getLabs(){
        return labs;
    }
    public void addLab(Lab lab){
        labs.add(lab);
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getCourseDescription() {
        return courseDescription;
    }

    public void setCourseDescription(String courseDescription) {
        this.courseDescription = courseDescription;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public long getCourseID() {
        return courseID;
    }

    public void setCourseID(long courseID) {
        this.courseID = courseID;
    }

    public void setLabs(List<Lab> labs) {
        this.labs = labs;
    }

    public List<LabDTO> getLabDTOS() {
        return labDTOS;
    }

    public void setLabDTOS(List<LabDTO> labDTOS) {
        this.labDTOS = labDTOS;
    }

    //    public int getCourseEnrollment() {
//        return courseEnrollment;
//    }
//
//    public void setCourseEnrollment(int courseEnrollment) {
//        this.courseEnrollment = courseEnrollment;
//    }


    @Override
    public String toString() {
        return "CourseDTO{" +
                "courseID=" + courseID +
                ", email='" + email + '\'' +
                ", courseName='" + courseName + '\'' +
                ", courseNumber='" + courseNumber + '\'' +
                ", courseDescription='" + courseDescription + '\'' +
                ", code='" + code + '\'' +
                ", labs=" + labs +
                '}';
    }
}

