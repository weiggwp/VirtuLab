package backend;

import backend.model.User;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class Application {

    @Autowired
    static UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        insert();

    }

    public static void insert(){
//        User user = new User();
//        user.setEmail("John@gmail.com");
//        userRepository.save(user);
    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/signup").allowedOrigins("http://localhost:3001");
//            }
//        };
//    }
}