package backend.dto;


public class CourseDTO {

    private String courseName;
    private String courseDescription;
    private int courseNumber;
    private int courseEnrollment;

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

    public int getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(int courseNumber) {
        this.courseNumber = courseNumber;
    }

    public int getCourseEnrollment() {
        return courseEnrollment;
    }

    public void setCourseEnrollment(int courseEnrollment) {
        this.courseEnrollment = courseEnrollment;
    }
}

