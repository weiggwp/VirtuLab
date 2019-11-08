import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

// import axios from 'axios';
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

class Course_tab extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Navbar style={{backgroundColor: "lightgray", marginLeft: 40, marginRight: 40}}
                            className={"justify-content-between"}>
                        <Nav>
                            <Link to="/create_course">
                            <Button style={{backgroundColor: "#e88f65ff"}} variant="primary">Create Course</Button>
                            </Link>
                            </Nav>

                        <Nav>
                            <Link to="/account_settings">
                                <Image className={"config_image"}
                                   src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                            </Link>
                            </Nav>
                    </Navbar>
                </div>
                {<Expandable_Classes style={"settingsH3"}/>}


            </div>


        )
    }
}

class Lab_tab extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Navbar style={{backgroundColor: "lightgray", marginLeft: 40, marginRight: 40}}
                            className={"justify-content-between"}>
                        <Nav>
                            <Button style={{backgroundColor: "#e88f65ff"}} variant="primary">Create Lab</Button>
                        </Nav>

                        <Nav>
                            <Button style={{backgroundColor: "#e88f65ff"}} variant="primary">View Public Labs</Button>
                            <Link to="/account_settings">
                            <Image  className={"config_image"}
                                   src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>

                            </Link>
                        </Nav>
                    </Navbar>
                </div>
                {<Expandable_Classes style={"settingsH3"}/>}


            </div>


        )
    }
}

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
    }
    setRedirectCourse = () => {
        this.setState({
            redirectCourse: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirectAcct) {
            return <Redirect to='/account_settings'/>
        }
        // else if(this.state.redirectCourse){
        //     return <Redirect to='/add_course' />
        // }
        // else
        // {
        //     return <Redirect to='/do_lab' />
        // }
    }
    setRedirectLab = () => {
        this.setState({
            redirectLab: true
        })
    }

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
                            Instructor: SummerBagel
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>


                <div>
                    <div>
                        <Navbar style={{backgroundColor: "lightgray", marginLeft: 40, marginRight: 40}}
                                className={"justify-content-between"}>
                            <Nav>
                                <Button href="create_lab" style={{backgroundColor: "#e88f65ff"}} variant="primary">Create Lab</Button>
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
                                <h4>{lab.name}</h4>
                                {"Author: " + lab.author}
                                <br/>
                                {"Description: " + lab.description}
                                <br/>
                                {"Keywords: " + lab.keywords}
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