package backend.model;

import javax.persistence.*;



@Entity
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stepID;
    private int stepNum;
    private String instruction;
//    private Step next;


    //TODO: workspace: equipments in their states
    public Step() {}

    public Step(int stepNum, String instruction) {
        this.stepNum = stepNum;
        this.instruction = instruction;
//        this.next = next;
    }

    public long getStepID() {
        return stepID;
    }

    public void setStepID(long stepID) {
        this.stepID = stepID;
    }

    public int getStepNum() {
        return stepNum;
    }

    public void setStepNum(int stepNum) {
        this.stepNum = stepNum;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

//    public Step getNext() {
//        return next;
//    }
//
//    public void setNext(Step next) {
//        this.next = next;
//    }
}
