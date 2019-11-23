package backend.controller;

import backend.dto.LabDTO;
import backend.dto.UserDTO;
import backend.model.User;
import backend.service.UserService;
//import com.sun.xml.internal.messaging.saaj.packaging.mime.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import sun.reflect.annotation.ExceptionProxy;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Date;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
//import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletContext;
import java.io.IOException;
import java.util.Random;

@Controller
@CrossOrigin(origins = "*")
public class EmailController {
    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    @Autowired
    UserService userService;
    private String host;
    private String port;
    private String email;
    private String name;
    private String pass;
    private boolean initialized=false;
    public void init() {
        // reads SMTP server setting from web.xml file
        //ServletContext context = getServletContext();
        host = "smtp.gmail.com";
        port = "587";
        email = "virtulabsbu@gmail.com";
        name = "VirtuLab";
        pass = "Phantom41?";
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/forgot_password", method = RequestMethod.POST)
    public ResponseEntity forgotPassword(@RequestBody UserDTO userDTO) {
        if (!initialized)init();;
        System.out.println("user is "+userDTO);
            try{
                String newPassword = resetCustomerPassword(userDTO.getEmail_address());
                sendEmail(host,port,email,name
                        ,pass,userDTO.getEmail_address(),"Password reset","Your new password is: "+newPassword
                +"\nFor security reasons, you should reset this password as soon as you log in.");
                return new ResponseEntity( HttpStatus.OK);
            }
            catch (Exception e){
                e.printStackTrace();
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
    }
    public  void sendEmail(String host, String port,
                                 final String senderEmail, String senderName, final String password,
                                 String recipientEmail, String subject, String message) throws javax.mail.MessagingException,
           UnsupportedEncodingException {

        // sets SMTP server properties
        Properties properties = new Properties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");

        // creates a new session with an authenticator
        Authenticator auth = new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmail, password);
            }
        };

        Session session = Session.getInstance(properties, auth);

        // creates a new e-mail message
        Message msg = new MimeMessage(session);

        msg.setFrom(new InternetAddress(senderEmail, senderName));
        InternetAddress[] toAddresses = { new InternetAddress(recipientEmail) };
        msg.setRecipients(Message.RecipientType.TO, toAddresses);
        msg.setSubject(subject);
        msg.setSentDate(new Date());
        msg.setText(message);

        // sends the e-mail
        Transport.send(msg);

    }

    public String resetCustomerPassword(String email) throws Exception {
        User user = userService.findByEmail(email);

        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789"
                + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 9; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString
                    .charAt(index));
        }
        String randomPassword = sb.toString();
        System.out.println("pass is "+randomPassword);
        user.setPassword(passwordEncoder.encode(randomPassword));
        userService.save(user);

        return randomPassword;
    }

}
