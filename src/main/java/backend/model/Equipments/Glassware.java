package backend.model.Equipments;

import backend.model.DataNode;
import backend.model.Equipment;
import backend.model.Substances.Substance;

import javax.persistence.Entity;
import java.util.ArrayList;

@Entity
public class Glassware extends Equipment {
    protected ArrayList<Substance> substances = new ArrayList<>();


    public Glassware() {
    }

    public Glassware(double capacity) {
        this.capacity = capacity;
    }

    public Glassware(double capacity, double weight) {
        this.capacity = capacity;
        this.weight = weight;
    }

    @Override
    public DataNode interact(Equipment e, double capacityGiven) {
        if (e instanceof Glassware) { //pour the liquid
            Glassware g = (Glassware) e;
            capacity -= capacityGiven;
            e.setCapacity(e.getCapacity() + capacityGiven);
            ArrayList<Substance> arr = g.getSubstances();
            for (Substance substance : arr) {
                if (!substances.contains(substance)) {
                    substances.add(substance);
                }
            }
            return new DataNode(true, e.getCapacity());
        } else if (e instanceof Scale) {
            if (weight == -1) return new DataNode(false, -1);
            return new DataNode(true, weight);
        }
        return new DataNode(false, -1);
    }

    public ArrayList<Substance> getSubstances() {
        return substances;
    }

}
