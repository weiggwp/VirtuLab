package backend.repository;

import backend.model.Instructor;
import backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface InstructorRepository extends CrudRepository<Instructor, Long> {

    Instructor findByUsername(String name);
}
