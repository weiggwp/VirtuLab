package backend.repository;

import backend.model.Equipment;
import backend.model.Lab;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EquipmentRepository extends CrudRepository<Equipment, Long> {

    Iterable<Equipment> findAllByLab(Lab lab);
}
