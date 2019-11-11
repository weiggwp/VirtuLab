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

//    private StepDTO next;

}
