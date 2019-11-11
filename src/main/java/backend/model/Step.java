package backend.model;

import javax.persistence.*;

@Entity
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stepID;
    private String instruction;

    @ManyToOne
    @JoinColumn(name="labID")
    private Lab lab;


}
