package backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Step {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stepID;
    private String instruction;


}
