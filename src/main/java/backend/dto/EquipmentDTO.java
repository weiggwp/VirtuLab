package backend.dto;

import java.util.List;

public class EquipmentDTO {
    private String name;
    private double weight;
    private double amount;
    private long capacity;
    private double temperature;

    public EquipmentDTO(String name, double weight, double amount, long capacity, double temperature, String image, List<EquipmentDTO> items, boolean disabled, String type) {
        this.name = name;
        this.weight = weight;
        this.amount = amount;
        this.capacity = capacity;
        this.temperature = temperature;
        this.image = image;
        this.items = items;
        this.disabled = disabled;
        this.type = type;
    }

    private String image;
    private List<EquipmentDTO> items;
    private boolean disabled;
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    EquipmentDTO(){}

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

    public EquipmentDTO(String name, double weight, double amount, long capacity, double temperature, String image, List<EquipmentDTO> items, boolean disabled) {
        this.name = name;
        this.weight = weight;
        this.amount = amount;
        this.capacity = capacity;
        this.temperature = temperature;
        this.image = image;
        this.items = items;
        this.disabled = disabled;
    }

    @Override
    public String toString() {
        return "EquipmentDTO{" +
                "name='" + name + '\'' +
                ", weight=" + weight +
                ", amount=" + amount +
                ", capacity=" + capacity +
                ", temperature=" + temperature +
                ", image='" + image + '\'' +
                ", containingItems=" + items +
                ", disabled=" + disabled +
                '}';
    }
}
