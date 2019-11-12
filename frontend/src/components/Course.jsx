import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import {Lab} from './lab.jsx'

const imagesPath = {
    minus: "https://www.materialui.co/materialIcons/navigation/expand_more_black_192x192.png",
    plus: "https://www.materialui.co/materialIcons/navigation/expand_less_black_192x192.png"
};

class Course extends React.Component {

    constructor(props) {
        super(props);
        this.states = {
            open : false
        }

    }
    clicked()
    {
        this.states.open = this.states.open === false;
        console.log("clicked");
    }
    toggleImage = () => {
        let x = !(this.states.open);
        this.setState({open: !this.states.open});
        console.log(this.states.open);
    };
    getImageName = () => this.states.open ? 'plus' : 'minus';


    render()
    {
        const imageName = this.getImageName();
        return(
            <Card style={{borderWidth:2,borderColor:"black"}} >
                <Accordion.Toggle as={Card.Header} onClick={this.toggleImage} eventKey={this.props.icount} style={{backgroundColor:"#DDB57E"}}>
                    <Navbar  className={"justify-content-between"}>
                        <Nav >


                            <h3 className={this.props.style}>{this.props.class.classname}</h3>

                        </Nav>

                        <Nav >

                            <Image  className={"config_image"}  src={imagesPath[imageName]} rounded />

                        </Nav>

                    </Navbar>
                </Accordion.Toggle>
                <Accordion.Collapse style={{backgroundColor:"lightblue",borderWidth:2}} eventKey={this.props.fcount}>
                    <Card.Body >
                        {this.props.class.labs.map(classItem => (
                            <Lab  style={this.props.style} labname={classItem.name}/>




                        ))}



                        {/*import React from 'react';*/}

                        {/*class Course {*/}
                        {/*    constructor(id, name, semester, instructor, labs, students) {*/}
                        {/*        this.id = id;*/}
                        {/*        this.name = name;*/}
                        {/*        this.semester =  semester;*/}
                        {/*        this.instructor = instructor;*/}
                        {/*        this.labs = labs;*/}
                        {/*        this.students = students;*/}

                        {/*    }*/}
                        {/*    add_lab(lab){*/}
                        {/*        this.labs.append(lab);*/}
                        {/*    }*/}

                        {/*}*/}

                        {/*class Course_component extends React.Component{*/}
                        {/*    constructor(props){*/}
                        {/*        super(props);*/}
                        {/*        this.state = {*/}
                        {/*            course: new Course(props.id,props.name, props.semester, props.instructor, props.labs, props.students),*/}
                        {/*        }*/}
                        {/*    }*/}
                        {/*}*/}




                    </Card.Body>

                </Accordion.Collapse>
            </Card>


        );
    }
}

export {Course};