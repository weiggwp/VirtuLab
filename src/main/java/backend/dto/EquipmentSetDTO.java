package backend.dto;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class EquipmentSetDTO {
    private List<EquipmentDTO> Solution; // for now, a list of solutions
    private List<EquipmentDTO> Glassware;
    private List<EquipmentDTO> Tools;

    public EquipmentSetDTO(List<EquipmentDTO> solution, List<EquipmentDTO> glassware, List<EquipmentDTO> tools) {
        Solution = solution;
        Glassware = glassware;
        Tools = tools;
    }

    EquipmentSetDTO(){}

    @Override
    public String toString() {
        return "EquipmentSetDTO{" +
                "Solution=" + Solution +
                ", Glassware=" + Glassware +
                ", Tools=" + Tools +
                '}';
    }

    public List<EquipmentDTO> getSolution() {
        return Solution;
    }

    public void setSolution(List<EquipmentDTO> solution) {
        Solution = solution;
    }

    public List<EquipmentDTO> getGlassware() {
        return Glassware;
    }

    public void setGlassware(List<EquipmentDTO> glassware) {
        Glassware = glassware;
    }

    public List<EquipmentDTO> getTools() {
        return Tools;
    }

    public void setTools(List<EquipmentDTO> tools) {
        Tools = tools;
    }
}
