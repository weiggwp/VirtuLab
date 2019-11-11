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

    public Course(String courseName, long courseID){
        this.courseID=courseID;
        this.courseName=courseName;
    }

    public long getCourseID(){
        return courseID;
    }
    public String getCourseName(){
        return this.courseName;
    }
    @ManyToMany
    @JoinTable(name = "course_lab", joinColumns = {@JoinColumn(name = "courseID")},
                inverseJoinColumns = {@JoinColumn(name = "labID")})
    private List<Lab> labs;





}
