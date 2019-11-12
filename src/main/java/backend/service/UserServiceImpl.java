package backend.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import backend.dto.UserDTO;
import backend.model.Role;
import backend.model.User;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;



    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User register(UserDTO registration) {
        User user = new User();
        user.setFirstName(registration.getFirst_name());
        user.setLastName(registration.getLast_name());
        user.setEmail(registration.getEmail_address());
        user.setPassword(registration.getPassword());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setRole(registration.getRole());
        if (registration.isStudent())
            user.setRoles(Arrays.asList(new Role("student")));
        else if (!registration.isStudent())
            user.setRoles(Arrays.asList(new Role("instructor")));

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }

    private Collection < ? extends GrantedAuthority > mapRolesToAuthorities(Collection < Role > roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }
}