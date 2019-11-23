package backend.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class UserCourseLab {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userCourseLabID;

    @Id
    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "courseID")
    private Course course;

    @Id
    @ManyToOne
    @JoinColumn(name = "labID")
    private Lab lab;

    private int grade;
    private boolean isComplete;
    private Date date;


    public UserCourseLab(User user, Course course, Lab lab, int grade, boolean isComplete, Date date) {
        this.user = user;
        this.course = course;
        this.lab = lab;
        this.grade = grade;
        this.isComplete = isComplete;
        this.date = date;
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

    public boolean isComplete() {
        return isComplete;
    }

    public void setComplete(boolean complete) {
        isComplete = complete;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
