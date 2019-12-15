
package backend.model;


import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Equipment {

    protected String name;

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long equipmentID;


    protected double capacity;
    protected int state;
    private String chemProp;

    @ManyToOne
    protected Lab lab;

    protected double weight;

    private double amount;
    private double temperature;
    private String image;
    @OneToMany(cascade = CascadeType.PERSIST)
    private List<Equipment> items = new ArrayList<>();

    private boolean disabled;
    private long size;
    private String color;

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @JsonProperty("left")
    private int x;
    @JsonProperty("top")
    private int y;


    @Override
    public String toString() {
        return "Equipment{" +
                "name='" + name + '\'' +
                ", equipmentID=" + equipmentID +
                ", capacity=" + capacity +
                ", state=" + state +
                ", lab=" + lab +
                ", weight=" + weight +
                ", amount=" + amount +
                ", temperature=" + temperature +
                ", image='" + image + '\'' +
                ", items=" + items +
                ", disabled=" + disabled +
                ", size=" + size +
                ", color='" + color + '\'' +
                ", x=" + x +
                ", y=" + y +
                ", type='" + type + '\'' +
                '}';
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
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


    public Equipment clone(){
        Equipment clone = new Equipment();
        clone.setCapacity(capacity);
        clone.setAmount(amount);
        clone.setColor(color);
        clone.setDisabled(disabled);
        clone.setImage(image);

        clone.setName(name);
        clone.setSize(size);
        clone.setState(state);
        clone.setTemperature(temperature);
        clone.setType(type);
        clone.setWeight(weight);
        clone.setX(x);
        clone.setY(y);

        LinkedList<Equipment> itemsClone = new LinkedList<>();
        for (Equipment item: items){
            itemsClone.add(item.clone());
        }
        clone.setItems(itemsClone);
        return clone;
    }


}
