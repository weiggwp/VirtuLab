package backend.dto;


import backend.model.AssignedLab;
import backend.model.Lab;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class CourseDTO {

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
    private List<AssignedLab> labs = new ArrayList<>();
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


//    private int courseEnrollment;
    public List<AssignedLab> getLabs(){
        return labs;
    }
    public void addLab(AssignedLab lab){
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
                "email='" + email + '\'' +
                ", courseName='" + courseName + '\'' +
                ", courseNumber='" + courseNumber + '\'' +
                ", courseDescription='" + courseDescription + '\'' +
                ", code='" + code + '\'' +

                '}';
    }
}

