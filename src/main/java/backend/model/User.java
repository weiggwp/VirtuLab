package backend.model;

import lombok.*;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

//@AllArgsConstructor
//@NoArgsConstructor
//@ToString
//@Setter
//@Getter
//@Data
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private boolean isStudent;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "instructor_course",
            joinColumns = {@JoinColumn(name = "id")},
            inverseJoinColumns = {@JoinColumn(name = "courseID")})
    private List<Course> courses;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "instructor_lab",
            joinColumns = {@JoinColumn(name = "id")},
            inverseJoinColumns = {@JoinColumn(name = "labID")})
    private List<Lab> labs;






    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;


    public User(String firstName, String lastName, String email, String password, List<Course> courses, List<Lab> labs, Collection<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.courses = courses;
        this.labs = labs;
        this.roles = roles;
    }

    public User() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public List<Lab> getLabs() {
        return labs;
    }

    public void setLabs(List<Lab> labs) {
        this.labs = labs;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}
