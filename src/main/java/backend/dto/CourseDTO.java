package backend.dto;


import com.fasterxml.jackson.annotation.JsonProperty;

public class CourseDTO {

    @JsonProperty("course_name")
    private String courseName;
    @JsonProperty("course_number")
    private String courseNumber;
    @JsonProperty("description")
    private String courseDescription;

//    private int courseEnrollment;

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
                "courseName='" + courseName + '\'' +
                ", courseNumber=" + courseNumber +
                ", courseDescription='" + courseDescription + '\'' +
                '}';
    }
}

