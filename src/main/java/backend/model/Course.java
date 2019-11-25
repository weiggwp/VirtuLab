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


    public Course(String courseName, long courseID){
        this.courseID=courseID;
        this.courseName=courseName;
        labs = new ArrayList<Lab>();
    }

    @OneToMany(mappedBy = "course", orphanRemoval = true, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<CourseLab> courseLabList = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "course_lab", joinColumns = {@JoinColumn(name = "courseID")},
                inverseJoinColumns = {@JoinColumn(name = "labID")})
    private List<Lab> labs;
    public static int instanceCnt;


//    @ManyToMany
//    @JoinTable(name = "user_course",
//        joinColumns = {@JoinColumn(name = "courseID")},
//        inverseJoinColumns = {@JoinColumn(name = "id")})
//    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "course", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<UserCourse> userCourseList = new ArrayList<>();

    public String getAccessCode() {
        return accessCode;
    }

    public void setAccessCode(String accessCode) {
        this.accessCode = accessCode;
    }

//    public List<User> getUsers() {
//        return users;
//    }
//
//    public void setUsers(List<User> users) {
//        this.users = users;
//    }

    public List<UserCourse> getUserCourseList() {
        return userCourseList;
    }

    public void setUserCourseList(List<UserCourse> userCourseList) {
        this.userCourseList = userCourseList;
    }

    public Course(String courseName, String courseDescription, String courseNumber, int courseEnrollment, List<Lab> labs, List<User> users) {
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.courseNumber = courseNumber;
        this.courseEnrollment = courseEnrollment;
        this.labs = new ArrayList<>();
//        this.users = new ArrayList<>();

        this.accessCode = generateAccessCode();
        instanceCnt++;
    }

    private String generateAccessCode(){
        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 3; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString
                    .charAt(index));
        }
        return sb.toString() + instanceCnt;
    }


    public Course() {
        instanceCnt ++;
    }


    public void setCourseID(long courseID) {
        this.courseID = courseID;
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

    public List<CourseLab> getCourseLabList() {
        return courseLabList;
    }

    public void setCourseLabList(List<CourseLab> courseLabList) {
        this.courseLabList = courseLabList;
    }

    //
//    public List<User> getStudents() {
//        return users;
//    }
//
//    public void setStudents(List<User> users) {
//        this.users = users;
//    }
    public void addLab(Lab lab){
        labs.add(lab);
    }
    public long getCourseID(){
        return courseID;
    }
    public String getCourseName(){
        return this.courseName;
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
                ", courseLabList=" + courseLabList +
                ", labs=" + labs +
                ", userCourseList=" + userCourseList +
                '}';
    }
}
