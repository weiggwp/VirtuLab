package backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "user_course_lab_association")
public class UserCourseLab {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userCourseLabID;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;



    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "courseID")
    private Course course;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "labID")
    private Lab lab;

    private int grade;
    private int complete;
    private Date submittedDate;

    public UserCourseLab() {
    }

    public Date getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(Date submittedDate) {
        this.submittedDate = submittedDate;
    }

    public UserCourseLab(User user, Course course, Lab lab) {
        this.user = user;
        this.course = course;
        this.lab = lab;
        submittedDate=new Date();
    }

    public UserCourseLab(User user, Course course, Lab lab, int grade, int complete, Date date) {
        this.user = user;
        this.course = course;
        this.lab = lab;
        this.grade = grade;
        this.complete = complete;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public int getComplete() {
        return complete;
    }

    public void setComplete(int complete) {
        this.complete = complete;
    }

    public void setComplete(boolean complete) {
        complete = complete;
    }

}
