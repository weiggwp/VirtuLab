package backend.model.Equipments;

import backend.model.Substances.Glucose;
import backend.model.Substances.Substance;

import javax.persistence.Entity;
import java.util.ArrayList;
import java.util.Collection;


@Entity
public class GlucoseSolution extends Glassware {
    public GlucoseSolution(double capacity){
        this.capacity=capacity;
        this.substances=new ArrayList<Substance>((Collection<? extends Substance>) new Glucose());
    }
}
