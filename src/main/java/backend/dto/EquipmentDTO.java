package backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class EquipmentDTO {

    private long EquipmentID;
    private String name;
    private double weight;
    private double amount;
    private long capacity;

    private double temperature;
    private String image;
    private List<EquipmentDTO> items;
    private boolean disabled;
    private String type;
    @JsonProperty("left")
    private int x=0;
    @JsonProperty("top")
    private int y=0;


    @Override
    public String toString() {
        return "EquipmentDTO{" +
                "name='" + name + '\'' +
                ", weight=" + weight +
                ", amount=" + amount +
                ", capacity=" + capacity +
                ", temperature=" + temperature +
                ", image='" + image + '\'' +
                ", items=" + items +
                ", disabled=" + disabled +
                ", type='" + type + '\'' +
                ", x=" + x +
                ", y=" + y +
                '}';
    }

    public long getEquipmentID() {
        return EquipmentID;
    }

    public void setEquipmentID(long equipmentID) {
        EquipmentID = equipmentID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public long getCapacity() {
        return capacity;
    }

    public void setCapacity(long capacity) {
        this.capacity = capacity;
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

    public List<EquipmentDTO> getItems() {
        return items;
    }

    public void setItems(List<EquipmentDTO> items) {
        this.items = items;
    }

    public boolean getDisabled() {
        return disabled;
    }

    public void setDisabled(boolean disabled) {
        this.disabled = disabled;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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


}
