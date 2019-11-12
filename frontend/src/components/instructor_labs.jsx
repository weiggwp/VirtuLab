import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import icon from '../Images/v.jpg';
import {Button, Image, Navbar, NavItem, InputGroup, Nav} from 'react-bootstrap';


import image from '../Images/lab_promo.png'
import login from "./login";
import {Droppable_course} from "./droppable_course";
import {Expandable_Classes} from "./expandable_course";
import InstructorHeader from "./instructorHeader";
import GLOBALS from "../Globals";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

class labOjb {
    constructor(id, name, author, keywords, description, courses) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.keywords = keywords;
        this.description = description;
        this.courses = courses;
    }

}
class instructor_labs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            inCoursePage: true,
            redirectAcct: false,
            redirectCourse: false,
            redirectLab: false,

            labs: [
                new labOjb(0,
                    "Intro to Beakers",
                    "Noob",
                    "Beaker, Intro, Break, Solution",
                    "Student will learn how to use beaker in lab setting"),
                new labOjb(1,
                    "Dilution",
                    "Anonymous",
                    "Beaker, Chemicals, Solution, Reaction",
                    "Student will learn how to use mix solution with different concentrations"),
            ],


        };
    }

    setRedirectAcct = () => {
        this.setState({
            redirectAcct: true
        })
    };

    handleCreateLab = () => {
        this.setState({
            redirectLabCreation: true
        })
    };


    setRedirectCourse = () => {
        this.setState({
            redirectCourse: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirectAcct) {
            return <Redirect to='/account_settings'/>
        }
        else if (this.state.redirectLabCreation){
            return <Redirect exact to={{
                pathname: '/create_lab',
                state: {user: this.state.user},
            }}/>;
        }
    };
    setRedirectLab = () => {
        this.setState({
            redirectLab: true
        })
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(GLOBALS.BASE_URL + 'get_labs', axiosConfig)
            .then((response) => {


            })
    };

    render() {
        let labs = this.state.labs;
        return (
            <div>
                {this.renderRedirect()}
                <InstructorHeader currentTab="Labs"/>
                <Navbar>
                    <Navbar.Brand href="#instructor_home">Welcome!</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Instructor: {this.props.name}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>


                <div>
                    <div>
                        <Navbar style={{backgroundColor: "lightgray", marginLeft: 40, marginRight: 40}}
                                className={"justify-content-between"}>
                            <Nav>
                                <Button onClick={this.handleCreateLab} style={{backgroundColor: "#e88f65ff"}} variant="primary">Create Lab</Button>
                            </Nav>

                            <Nav>
                                <Button style={{backgroundColor: "#e88f65ff"}} variant="primary">View Public
                                    Labs</Button>
                                <Link to="/account_settings">
                                    <Image className={"config_image"}
                                       src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                                </Link>
                                </Nav>
                        </Navbar>
                    </div>
                    <div>
                        {labs.map(lab => (
                            <div style={{
                                textAlign: "left", marginLeft: 40, marginRight: 40, marginTop: 10,
                                borderStyle: "dashed", borderWidth: 1
                            }}>
                                <ButtonGroup style={{width:"100%"}}>


                                    <Dropdown as={ButtonGroup} style={{width:"100%"}} class={"dropdown-menu-right dropdown-button-drop-right"}>
                                    {/*    <Button variant="info" style={{width:"90%"}} style={{textAlign:"left"}}disabled>*/}
                                    {/*        <div >*/}
                                    {/*        {lab.name}     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>*/}
                                    {/*        /!*{"Author: " + lab.author}*!/*/}
                                    {/*        /!*<br/>*!/*/}
                                    {/*        /!*{"Description: " + lab.description}*!/*/}
                                    {/*        /!*<br/>*!/*/}
                                    {/*        /!*{"Keywords: " + lab.keywords}*!/*/}
                                    {/*        </div>*/}
                                    {/*    </Button>*/}

                                        <Dropdown.Toggle  style={{textAlign:"left",}} variant="info" >
                                            {lab.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu class="dropdown-menu">
                                            <Dropdown.Item class={"dropdown-item"} eventKey="1">View</Dropdown.Item>
                                            <Dropdown.Item class={"dropdown-item"} eventKey="2">Edit</Dropdown.Item>
                                            <Dropdown.Item class={"dropdown-item"} eventKey="3">Publish</Dropdown.Item>
                                            <Dropdown.Item class={"dropdown-item"} eventKey="4" >Delete</Dropdown.Item>
                                            {/*<Dropdown.Divider />*/}

                                        </Dropdown.Menu>
                                    </Dropdown>



                                </ButtonGroup>


                            </div>


                        ))}

                    </div>
                    {/*{<Expandable_Classes style={"settingsH3"}/>}*/}


                </div>
            </div>


        )
    }
}

export default instructor_labs;