package backend.model;

import backend.model.Substances.Substance;

import java.util.ArrayList;

public abstract class Equipment {

    protected String name;

    protected double capacity;
    protected int state;
    protected double weight;

    public abstract DataNode interact(Equipment e, double capacityGiven);

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public double getWeight() {
        return weight;
    }
    public void setWeight(double weight) {
        this.weight = weight;
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

}
