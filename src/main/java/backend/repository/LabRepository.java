package backend.repository;

import backend.model.Lab;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public interface LabRepository extends CrudRepository<Lab, Long> {

    Lab findByLabID(long id);


    Optional<Lab> findLabByLabID(long id);

    Optional<Lab> findLabByName(String name);

    List<Lab> findAll();



}
