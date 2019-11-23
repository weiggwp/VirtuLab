package backend.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

public class AssignedLab {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long labID;
    private Lab lab;
    private Date dueDate;
    private long courseID;

    public AssignedLab(Lab lab, Date dueDate, long courseID) {
        this.labID=lab.getLabID();
        this.lab=lab;
        this.dueDate = dueDate;
        this.courseID = courseID;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public long getCourseID() {
        return courseID;
    }

    public void setCourseID(long courseID) {
        this.courseID = courseID;
    }
}
