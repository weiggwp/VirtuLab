package backend.model;

import backend.dto.StepDTO;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stepID;
    private long stepNum;

    public List<Equipment> getEquipments() {
        return equipments;
    }

    public void setEquipments(List<Equipment> equipments) {
        this.equipments = equipments;
    }

    private String instruction;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Equipment> equipments = new ArrayList<>();

//    @ManyToOne
//    @JoinColumn(name="labID")
//    private Lab lab;

    public Step clone(){
        return new Step(stepNum,instruction);
    }

    public long getStepID() {
        return stepID;
    }

    public void setStepID(long stepID) {
        this.stepID = stepID;
    }

    public Step() {
    }

    public Step(long stepNum, String instruction) {
        this.stepNum = stepNum;
        this.instruction = instruction;
    }

    public long getStepNum() {
        return stepNum;
    }

    public void setStepNum(long stepNum) {
        this.stepNum = stepNum;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public StepDTO dtoClone(){
        StepDTO s= new StepDTO((int)stepNum,instruction);
        s.setStepID(stepID);
        return s;
    }

    @Override
    public String toString() {
        return "Step{" +
                "stepID=" + stepID +
                ", stepNum=" + stepNum +
                ", instruction='" + instruction + '\'' +
                ", equipments=" + equipments +
                '}';
    }
}
