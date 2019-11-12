package backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class StepDTO {

    @NotNull
    @NotEmpty
    private int stepNum;
    @NotNull
    @NotEmpty
    private String instruction;

    public StepDTO(){}

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

    public StepDTO(@NotNull @NotEmpty int stepNum, @NotNull @NotEmpty String instruction) {
        this.stepNum = stepNum;
        this.instruction = instruction;
    }

    @Override
    public String toString() {
        return "StepDTO{" +
                "stepNum=" + stepNum +
                ", instruction='" + instruction + '\'' +
                '}';
    }
}
