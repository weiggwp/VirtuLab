package backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;


@Entity
public class UserCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userCourseID;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id")
    User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "courseID")
    Course course;

    public UserCourse() {
    }

    public UserCourse(long userCourseID, User user, Course course) {
        this.userCourseID = userCourseID;
        this.user = user;
        this.course = course;
    }

    public long getID() {
        return userCourseID;
    }

    public void setID(long userCourseID) {
        this.userCourseID = userCourseID;
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
}
