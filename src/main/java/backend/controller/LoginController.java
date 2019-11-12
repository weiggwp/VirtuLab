package backend.controller;

import backend.dto.TokenDTO;
import backend.dto.UserDTO;
import backend.model.User;
import backend.service.UserService;
import io.jsonwebtoken.*;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.security.Key;

@Controller
@CrossOrigin(origins = "*")
public class LoginController {
    SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
    Key signingKey = new SecretKeySpec(DatatypeConverter.parseBase64Binary("SECRET_KEY"), signatureAlgorithm.getJcaName());

    @Autowired
    UserService userService;
    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity loginPage(@RequestBody UserDTO userDTO) {
        System.out.println(userDTO);
        System.out.println("Login Controller is called");
        System.out.println(userDTO.getEmail_address());
        User existing = userService.findByEmail(userDTO.getEmail_address());
        System.out.println("existing:"+existing);

        if (existing == null)
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        if (!passwordEncoder.matches(userDTO.getPassword(),existing.getPassword()))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        System.out.println("return http OK\n");
        String token =createToken(existing.getEmail(),existing.getRole(),existing.getFirstName()+" "+existing.getLastName());


        TokenDTO dto = new TokenDTO(" "," ",existing.getRole(),token);

        return new ResponseEntity<>(dto,HttpStatus.OK);
    }
    public String isStudent(boolean isStudent)
    {
        if(isStudent)
            return "student";
        return "instructor";

    }

    public String createToken(String email,String student,String name)
    {

        return Jwts.builder()
                .setIssuedAt(new Date())
                .setSubject(email)
                .claim("student",student)
                .claim("name",name)
                .signWith(signatureAlgorithm,signingKey)
                .compact();

    }
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/verify", method = RequestMethod.POST)
    public ResponseEntity verifyToken(@RequestBody String token) {

        try {
            Jws<Claims> jws = Jwts.parser()
                    .setSigningKey(signingKey)
                    .parseClaimsJws(token);
            System.out.println("student is"+jws.getBody().get("student"));
            TokenDTO dto = new TokenDTO(jws.getBody().get("name").toString(),jws.getBody().getSubject(),jws.getBody().get("student").toString()," ");

                return ResponseEntity.ok(dto);

        } catch (JwtException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }



    @CrossOrigin(origins = "*")
    @RequestMapping(value="/logout", method = RequestMethod.GET)
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/login?logout=true";
    }


}