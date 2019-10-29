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


                            <h3 className={this.props.style}>{this.props.classname}</h3>

                        </Nav>

                        <Nav >

                            <Image  className={"config_image"}  src={imagesPath[imageName]} rounded />

                        </Nav>

                    </Navbar>
                </Accordion.Toggle>
                <Accordion.Collapse style={{backgroundColor:"lightblue",borderWidth:2}} eventKey={this.props.fcount}>
                    <Card.Body >

                        <Lab  style={this.props.style} labname={"Lab 1: Introduction to using Beaker"}/>

                        <Lab  style={this.props.style} labname={"Lab 0: Introduction to VirtuLab"}/>




                    </Card.Body>

                </Accordion.Collapse>
            </Card>


        );
    }
}

export {Course};