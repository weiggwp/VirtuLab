package backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class EquipmentDTO {
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
    private long x=0;
    @JsonProperty("top")
    private long y=0;


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

    public boolean isDisabled() {
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

    public long getX() {
        return x;
    }

    public void setX(long x) {
        this.x = x;
    }

    public long getY() {
        return y;
    }

    public void setY(long y) {
        this.y = y;
    }
}
