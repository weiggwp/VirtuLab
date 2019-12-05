package backend.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
public class EquipmentSet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long equipmentSetID;

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Equipment> Solution = new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Equipment> Glassware =new ArrayList<>();

    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Equipment> Tools = new ArrayList<>();

    public long getEquipmentSetID() {
        return equipmentSetID;
    }

    public void setEquipmentSetID(long equipmentSetID) {
        this.equipmentSetID = equipmentSetID;
    }

    public List<Equipment> getSolution() {
        return Solution;
    }

    public void setSolution(List<Equipment> solution) {
        Solution = solution;
    }

    public List<Equipment> getGlassware() {
        return Glassware;
    }

    public void setGlassware(List<Equipment> glassware) {
        Glassware = glassware;
    }

    public List<Equipment> getTools() {
        return Tools;
    }

    public void setTools(List<Equipment> tools) {
        Tools = tools;
    }
}
