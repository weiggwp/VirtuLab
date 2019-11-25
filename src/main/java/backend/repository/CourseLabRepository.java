package backend.repository;

import backend.model.CourseLab;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CourseLabRepository extends CrudRepository<CourseLab, Long> {

}
