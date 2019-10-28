package backend.service;

import backend.model.Instructor;
import backend.model.Student;
import backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void changePassword(String email, String password) {
        Student s = studentRepository.findByEmail(email);
        s.setPassword(passwordEncoder.encode(password));
        studentRepository.save(s);
    }

    public void register(Student student) {
        studentRepository.save(student);
    }

    public Student isRegister(String email) {
        Student student = studentRepository.findByEmail(email);
        return student;
    }

}
