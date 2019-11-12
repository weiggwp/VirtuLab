package backend.LoginConfig;

import backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserService userService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http

                .cors()
                .and().authorizeRequests()
                .anyRequest().permitAll()
                .and().csrf().disable()
//                .formLogin().loginPage("/index.html")
//                .loginProcessingUrl("/login")
        ;
                //.addFilterBefore(corsFilter(), SessionManagementFilter.class) //adds your custom CorsFilter
//                .cors()
//                .and()
//                .authorizeRequests()
//                .antMatchers(
//                        "/instructor_home/**",
//                                    "/student_home/**"
//
//                ).permitAll()
//                .anyRequest().authenticated()
//                .and().csrf().disable()
//                .formLogin().loginPage("/login").permitAll();

    }


//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//
//        http
//                .cors().and()
//                .csrf().disable()   //allow post requests
//                .authorizeRequests()
////                .antMatchers(
////                        "/register**",
////                        "/history/**",
////                        "/favicon.ico",
////                        "/static/**",
////                        "/images/**",
////                        "/css/**",
////                        "/signup/**",
////                        "/img/**",
////                        "/webjars/**").permitAll()
////                .anyRequest().authenticated()
//                .and()  //authethicated for anyRequest(), i changed it
//                .formLogin()
//                .loginPage("/login")
//                .permitAll()
//                .and()
//                .logout()
//                .invalidateHttpSession(true)
//                .clearAuthentication(true)
//                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
//                .logoutSuccessUrl("/login?logout")
//                .permitAll()
//        ;
//    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }





}