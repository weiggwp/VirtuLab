package backend.service;

import backend.model.Instructor;
import backend.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class InstructorService {
    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void changePassword(String email, String password) {

        Instructor instructor = instructorRepository.findByEmail(email);
        instructor.setPassword(passwordEncoder.encode(password));
        instructorRepository.save(instructor);

    }

    public void register(Instructor instructor) {
        instructor.setPassword(passwordEncoder.encode(instructor.getPassword()));
        instructorRepository.save(instructor);
    }

    public Instructor isRegister(String email) {
        Instructor instructor = instructorRepository.findByEmail(email);
        return instructor;
    }
}
