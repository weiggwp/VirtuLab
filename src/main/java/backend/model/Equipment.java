
package backend.model;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Equipment {

    protected String name;

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long equipmentID;


    protected double capacity;
    protected int state;

    @ManyToOne
    protected Lab lab;

    protected double weight;

    private double amount;
    private double temperature;
    private String image;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Equipment> items = new ArrayList<>();

    private boolean disabled;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    private String type;

    public Equipment(){

    }

    public String getName() {
        return name;
    }
//    public DataNode interact(Equipment e, double capacityGiven);

    public void setName(String name) {
        this.name = name;
    }

    public long getEquipmentID() {
        return equipmentID;
    }

    public void setEquipmentID(long equipmentID) {
        this.equipmentID = equipmentID;
    }

    public double getCapacity() {
        return capacity;
    }

    public void setCapacity(double capacity) {
        this.capacity = capacity;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Equipment> getItems() {
        return items;
    }

    public void setItems(List<Equipment> items) {
        this.items = items;
    }

    public boolean isDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

}
