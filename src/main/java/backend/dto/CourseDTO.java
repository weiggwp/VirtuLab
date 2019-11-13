package backend.dto;


import com.fasterxml.jackson.annotation.JsonProperty;

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

//    private int courseEnrollment;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

