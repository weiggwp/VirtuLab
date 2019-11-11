package backend.model.Equipments;

import backend.model.DataNode;
import backend.model.Equipment;

public class Scale extends Equipment {
    @Override
    public DataNode interact(Equipment e, double capacityGiven) {
        if (e.getWeight()==-1)return new DataNode(false,-1);
        return new DataNode(true,e.getWeight());
    }
}