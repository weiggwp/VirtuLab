package backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "course_lab_association")
public class CourseLab {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long courseLabID;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "courseID")
    private Course course;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "labID")
    private Lab lab;

    private Date date;

    public CourseLab() {
    }

    public CourseLab(Course course, Lab lab, Date date) {
        this.course = course;
        this.lab = lab;
        this.date = date;
    }

    public long getCourseLabID() {
        return courseLabID;
    }

    public void setCourseLabID(long courseLabID) {
        this.courseLabID = courseLabID;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "CourseLab{" +
                "courseLabID=" + courseLabID +
                ", courseID=" + course.getCourseID() +
                ", lab=" + lab +
                ", date=" + date +
                '}';
    }
}
