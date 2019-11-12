package backend.service;


import backend.model.Equipment;
import backend.model.Lab;
import backend.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentService {

    @Autowired
    EquipmentRepository equipmentRepository;

    public void saveEquipment(Equipment equipment) {
        equipmentRepository.save(equipment);
    }

    public void deleteAll() { equipmentRepository.deleteAll(); }

    public void deleteById(long id) {equipmentRepository.deleteById(id);}

    public Iterable<Equipment> findAllByLab(Lab lab) {
        return equipmentRepository.findAllByLab(lab);
    }





}
