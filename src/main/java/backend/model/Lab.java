package backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Lab {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long labID;
    private String name;






}
