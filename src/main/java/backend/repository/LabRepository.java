package backend.repository;

import backend.model.Lab;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LabRepository extends CrudRepository<Lab, Long> {

    Optional<Lab> findLabByLabID(long id);

    Optional<Lab> findLabByName(String name);

}
