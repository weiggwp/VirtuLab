package backend.model;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Attempt {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long attemptID;
    private int attempts;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private  List<Equipment> equipmentList = new ArrayList<>();

    public Attempt() {
    }

    public Attempt(int attempts, List<Equipment> equipmentList) {
        this.attempts = attempts;
        this.equipmentList = equipmentList;
    }

    public long getAttemptID() {
        return attemptID;
    }

    public void setAttemptID(long attemptID) {
        this.attemptID = attemptID;
    }

    public int getAttempt() {
        return attempts;
    }

    public void setAttempt(int attempt) {
        this.attempts = attempt;
    }

    public List<Equipment> getEquipmentList() {
        return equipmentList;
    }

    public void setEquipmentList(List<Equipment> equipmentList) {
        this.equipmentList = equipmentList;
    }
}
