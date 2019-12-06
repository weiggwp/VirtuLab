package backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

public class StepDTO {

    @NotNull
    @NotEmpty
    private int stepNum;

    @NotNull
    @NotEmpty
    private String instruction;
    private long stepID;


    public List<EquipmentDTO> getEquipments() {
        return equipments;
    }

    public void setEquipments(List<EquipmentDTO> equipments) {
        this.equipments = equipments;
    }


    @NotNull
    @NotEmpty
    private List<EquipmentDTO> equipments;
    public StepDTO(){}
    public void setStepID(long stepID){
        this.stepID=stepID;
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

    public StepDTO(@NotNull @NotEmpty int stepNum, @NotNull @NotEmpty String instruction) {
        this.stepNum = stepNum;
        this.instruction = instruction;
    }

    @Override
    public String toString() {
        return "StepDTO{" +
                "stepNum=" + stepNum +
                ", instruction='" + instruction + '\'' +
                ", equipments=" + equipments +
                '}';
    }
}
