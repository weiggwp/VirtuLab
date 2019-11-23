package backend.repository;

import backend.model.AssignedLab;
import backend.model.Lab;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AssignedLabRepository extends CrudRepository<AssignedLab, Long> {
    AssignedLab findByLabID(long id);


    Optional<AssignedLab> findLabByLabID(long id);

    Optional<AssignedLab> findLabByName(String name);

    List<AssignedLab> findAll();
}
