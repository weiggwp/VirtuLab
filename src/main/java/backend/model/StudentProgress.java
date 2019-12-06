package backend.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class StudentProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long StudentProgressID;

    /* these steps should copy the ones from the lab */
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    List<Attempt> attempts = new ArrayList<>();

    public StudentProgress() {
    }

    public long getStudentProgressID() {
        return StudentProgressID;
    }

    public void setStudentProgressID(long studentProgressID) {
        StudentProgressID = studentProgressID;
    }

    public List<Attempt> getAttempts() {
        return attempts;
    }

    public void setAttempts(List<Attempt> attempts) {
        this.attempts = attempts;
    }
}
