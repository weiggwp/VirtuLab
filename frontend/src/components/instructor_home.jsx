import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import InstructorHeader from "./instructorHeader";
// import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import '../stylesheets/instructor_home.css';
import icon from '../Images/v.jpg';
import {Button, Image, Navbar, NavItem, InputGroup, Nav} from 'react-bootstrap';


import image from '../Images/lab_promo.png'
import login from "./login";
import {Droppable_course} from "./droppable_course";
import {Expandable_Classes} from "./expandable_course";


class instructor_home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inCoursePage: true,
            redirectAcct: false,
            redirectCourse: false,
            redirectLab: false

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

    };
    setRedirectLab = () => {
        this.setState({
            redirectLab: true
        })
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <InstructorHeader currentTab="Courses"/>

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
                                <Button href="create_course" style={{backgroundColor: "#e88f65ff"}} variant="primary">Create
                                    Course</Button>
                            </Nav>

                            <Nav>
                                <Image onClick={this.setRedirectAcct} className={"config_image"}
                                       src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                            </Nav>
                        </Navbar>
                    </div>
                    {<Expandable_Classes style={"settingsH3"}/>}


                </div>
            </div>


        )
    }
}

export default instructor_home;