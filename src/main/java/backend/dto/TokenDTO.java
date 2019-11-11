package backend.dto;


public class TokenDTO {

    private String name;
    private String email;
    private String role;
    private String token;

    public TokenDTO(String name, String email, String role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public TokenDTO(String role, String token) {
        this.role = role;
        this.token = token;
    }

    public TokenDTO(String name, String email, String role, String token) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
