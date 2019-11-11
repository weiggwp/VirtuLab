package backend.model.Equipments;

import backend.model.Equipment;
import backend.model.Substances.Substance;
import backend.model.Substances.Water;

import java.util.ArrayList;
import java.util.Collection;

public class WaterBottle extends Glassware {
        public WaterBottle(double capacity){
        this.capacity=capacity;
        this.substances=new ArrayList<Substance>((Collection<? extends Substance>) new Water());
    }

}
