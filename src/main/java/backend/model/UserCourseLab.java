package backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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

    @JsonIgnore
    @OneToMany(mappedBy = "userCourseLab", orphanRemoval = true, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<UserCourseLabStep> userCourseLabStepList = new ArrayList<>();

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

    public long getUserCourseLabID() {
        return userCourseLabID;
    }

    public void setUserCourseLabID(long userCourseLabID) {
        this.userCourseLabID = userCourseLabID;
    }

    public List<UserCourseLabStep> getUserCourseLabStepList() {
        return userCourseLabStepList;
    }

    public void setUserCourseLabStepList(List<UserCourseLabStep> userCourseLabStepList) {
        this.userCourseLabStepList = userCourseLabStepList;
    }
}
