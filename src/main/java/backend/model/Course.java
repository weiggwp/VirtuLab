package backend.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long courseID;
    private String courseName;
    private String courseDescription;
    private int courseNumber;
    private int courseEnrollment;


    @ManyToMany
    @JoinTable(name = "course_lab",
            joinColumns = {@JoinColumn(name = "courseID")},
            inverseJoinColumns = {@JoinColumn(name = "labID")})
    private List<Lab> labs;

    @ManyToMany
    @JoinTable(name = "course_students",
        joinColumns = {@JoinColumn(name = "courseID")},
        inverseJoinColumns = {@JoinColumn(name = "id")})
    private List<User> students;

    public Course(String courseName, String courseDescription, int courseNumber, int courseEnrollment, List<Lab> labs, List<User> students) {
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.courseNumber = courseNumber;
        this.courseEnrollment = courseEnrollment;
        this.labs = labs;
        this.students = students;
    }


    public Course() {
    }

    public long getCourseID() {
        return courseID;
    }

    public void setCourseID(long courseID) {
        this.courseID = courseID;
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

    public List<Lab> getLabs() {
        return labs;
    }

    public void setLabs(List<Lab> labs) {
        this.labs = labs;
    }

    public List<User> getStudents() {
        return students;
    }

    public void setStudents(List<User> students) {
        this.students = students;
    }

    @Override
    public String toString() {
        return "Course{" +
                "courseID=" + courseID +
                ", courseName='" + courseName + '\'' +
                ", courseDescription='" + courseDescription + '\'' +
                ", courseNumber=" + courseNumber +
                ", courseEnrollment=" + courseEnrollment +
                ", labs=" + labs +
                ", students=" + students +
                '}';
    }
}
