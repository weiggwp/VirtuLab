package backend.model;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stepID;
    private int index;
    private String instruction;
    private Step next;


    //TODO: workspace: equipments in their states




}
