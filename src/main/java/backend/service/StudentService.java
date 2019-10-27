package backend.service;

import backend.model.Student;
import backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void changePassword(String username, String password) {
        Student s = studentRepository.findByUsername(username);
        s.setPassword(passwordEncoder.encode(password));
        studentRepository.save(s);
    }



}
