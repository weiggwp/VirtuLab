package backend.service;

import backend.dto.UserDTO;
import backend.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService extends UserDetailsService {

    User findByEmail(String email);
    User register(UserDTO registration);


}
