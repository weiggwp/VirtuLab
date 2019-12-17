import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import {Lab} from './lab.jsx'
import {Button} from "react-bootstrap";

const imagesPath = {
    minus: "https://www.materialui.co/materialIcons/navigation/expand_more_black_192x192.png",
    plus: "https://www.materialui.co/materialIcons/navigation/expand_less_black_192x192.png"
};

class Course extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : false
        }

    }
    clicked()
    {
        this.state.open = this.state.open === false;
        // console.log("clicked");
    }
    toggleImage = () => {
        let x = !(this.state.open);
        this.setState({open: !this.state.open});
        // console.log(this.states.open);
    };
    getImageName = () => this.state.open ? 'plus' : 'minus';


    render()
    {
        // console.log(this.props.class);
        // console.log("props is "+JSON.stringify(this.props.class))
        const imageName = this.getImageName();
        return(
            <Card style={{borderWidth:2}} >
                <Accordion.Toggle as={Card.Header} onClick={this.toggleImage}
                                  eventKey={this.props.icount} style={{backgroundColor:"#9fbcc2"}}>
                    <Navbar  className={"justify-content-between"}>
                        <Nav >


                            <h3 className={this.props.style}><b> Class Name:  </b>{this.props.class.classname}
                                <b> Access code:          </b> {this.props.class.accessCode}
                            </h3>

                        </Nav>

                        <Nav >

                            <Image  className={"config_image"}  src={imagesPath[imageName]} rounded />

                        </Nav>

                    </Navbar>
                </Accordion.Toggle>
                <Accordion.Collapse style={{backgroundColor:"lightblue",borderWidth:2}} eventKey={this.props.fcount}>
                    <Card.Body >
                        {this.props.class.labs.map(classItem => (
                            <Lab role={this.props.role}courseID={this.props.courseID}
                                 labID={classItem.labID}style={this.props.style} lab_name={classItem.lab_name}
                                   /* steps={classItem.steps} equipments={classItem.returnEquips}*/
                                 due_date={classItem.date} complete={classItem.complete}
                                    />




                        ))}




                    </Card.Body>

                </Accordion.Collapse>
            </Card>


        );
    }
}

export {Course};