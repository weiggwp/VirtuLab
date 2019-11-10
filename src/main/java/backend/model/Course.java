package backend.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long courseID;
    private String courseName;
    private String courseDescription;
    private String courseNumber;
    private int courseEnrollment;
    private String accessCode = generateAccessCode();

    public static int instanceCnt;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "course_lab",
            joinColumns = {@JoinColumn(name = "courseID")},
            inverseJoinColumns = {@JoinColumn(name = "labID")})
    private List<Lab> labs = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "course_students",
        joinColumns = {@JoinColumn(name = "courseID")},
        inverseJoinColumns = {@JoinColumn(name = "id")})
    private List<User> students = new ArrayList<>();

    public Course(String courseName, String courseDescription, String courseNumber, int courseEnrollment, List<Lab> labs, List<User> students) {
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.courseNumber = courseNumber;
        this.courseEnrollment = courseEnrollment;
        this.labs = new ArrayList<>();
        this.students = new ArrayList<>();

        this.accessCode = generateAccessCode();
        instanceCnt++;
    }

    private String generateAccessCode(){
        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(5);

        for (int i = 0; i < 3; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString
                    .charAt(index));
        }
        return sb.toString() + instanceCnt;
    }


    public Course() {
        instanceCnt++;
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

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
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
                ", courseNumber='" + courseNumber + '\'' +
                ", courseEnrollment=" + courseEnrollment +
                ", accessCode='" + accessCode + '\'' +
                ", labs=" + labs +
                ", students=" + students +
                '}';
    }
}
