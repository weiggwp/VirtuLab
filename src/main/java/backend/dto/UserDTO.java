package backend.dto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class UserDTO {

    @NotNull
    @NotEmpty
    private String first_name;
    @NotNull
    @NotEmpty
    private String last_name;
    @NotNull
    @NotEmpty
    private String email_address;
    @NotNull
    @NotEmpty
    private String password;
//    @NotNull
//    @NotEmpty
//    private String confirm_password;


    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail_address() {
        return email_address;
    }

    public void setEmail_address(String email_address) {
        this.email_address = email_address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public String getConfirm_password() {
//        return confirm_password;
//    }

//    public void setConfirm_password(String confirm_password) {
//        this.confirm_password = confirm_password;
//    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email_address='" + email_address + '\'' +
                ", password='" + password + '\'' +
//                ", confirm_password='" + confirm_password + '\'' +
                '}';
    }
}
