package backend.model;

import javax.persistence.*;

@Entity
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stepID;
    private long stepNum;
    private String instruction;

//    @ManyToOne
//    @JoinColumn(name="labID")
//    private Lab lab;


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

    @Override
    public String toString() {
        return "Step{" +
                "stepID=" + stepID +
                ", stepNum=" + stepNum +
                ", instruction='" + instruction + '\'' +
                '}';
    }

}
