package backend.service;

import backend.model.Instructor;
import backend.repository.InstructorRepository;
import backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class InstructorService {
    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void changePassword(String username, String password) {

        Instructor instructor = instructorRepository.findByUsername(username);
        instructor.setPassword(passwordEncoder.encode(password));
        instructorRepository.save(instructor);

    }
}
