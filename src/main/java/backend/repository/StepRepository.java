package backend.repository;

import backend.model.Lab;
import backend.model.Step;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StepRepository extends CrudRepository<Step, Long> {
}
