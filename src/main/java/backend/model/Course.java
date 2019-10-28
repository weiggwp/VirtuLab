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
    @JoinTable(name = "course_lab", joinColumns = {@JoinColumn(name = "courseID")},
                inverseJoinColumns = {@JoinColumn(name = "labID")})
    private List<Lab> labs;





}
