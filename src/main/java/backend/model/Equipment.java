package backend.model;


import javax.persistence.*;

@Entity
public abstract class Equipment {

    protected String name;

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long equipmentID;
    protected double capacity;
    protected int state;
    protected double weight;

    public abstract DataNode interact(Equipment e, double capacityGiven);

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}
    protected int cnt;

    @ManyToOne
    protected Lab lab;

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

    public int getCnt() {
        return cnt;
    }

    public void setCnt(int cnt) {
        this.cnt = cnt;
    }

    public abstract DataNode interact(Equipment e, double capacityGiven);
}
