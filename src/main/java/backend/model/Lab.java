package backend.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.HashMap;


@Entity
public class Lab {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long labID;
    private String name;





}
