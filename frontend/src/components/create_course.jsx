import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import icon from "../Images/v.jpg";
import {Button, Col, Container, FormControl, FormGroup, Image, Nav, Navbar, Row} from "react-bootstrap";
import '../stylesheets/account_settings.css';
import {Droppable_course} from './droppable_course.jsx'
import axios from "axios";
import GLOBALS from "../Globals";

export class create_course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instructor: props.instructor,
            course_name: '',
            course_number: '',
            semester: '',
            description: '',
            redirect: false,
            errors: '',
        };
    }

    handleFieldChange = (e, field) => {
        this.setState({[field]: e.target.value});
    };



    handleCreateCourse  = (e) => {
        e.preventDefault()
        const course= {
            email:this.props.email,
            course_number: this.state.course_number,
            course_name:this.state.course_name
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        var classArr=[];
        var classArray=[];
        alert("sending back "+course);
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'create_course', course, axiosConfig)
            .then((response) => {


            })
            .catch((error) => {
                    console.log("doot" + error)
                }
            );
    }

    renderBanner() {
        return (
            <div className="banner">
                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )
    }

    renderNavigation() {
        return (
            <div>
                <Navbar style={{backgroundColor: "lightgray", marginLeft: 100, marginRight: 200}}
                        className={"justify-content-between"}>
                    <Nav>
                        <Button href="instructor_home" style={{backgroundColor: "#e88f65ff"}} variant="primary">Go
                            Back</Button>
                    </Nav>

                    <Nav>
                        <Image onClick={this.setRedirectAcct} className={"config_image"}
                               src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                    </Nav>
                </Navbar>
            </div>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect exact to="/account_settings"/>;
        } else {
            return (
                <div>
                    {this.renderBanner()}

                    {this.renderNavigation()}

                    <div className={"lightblue centered"}
                         style={{display: 'flex', justifyContent: 'center', alignItems: 'top', height: '100vh'}}>
                        <br/>
                        <div className="box-container" style={{width: '50vh'}}>
                            <form onSubmit={this.handleCreateCourse}>
                                <h1 className={"accountH1"}>Course Creation</h1>
                                <h3 className="accountH3">Course Name</h3>

                                <FormGroup controlId="formBasicText" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        placeholder="Course Name"
                                        onChange={(e) => this.handleFieldChange(e, 'course_name')}
                                        required
                                    />
                                </FormGroup>


                                <h3 className="accountH3">Course Number</h3>

                                <FormGroup controlId="formBasicText" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        placeholder="e.g. CSE308"
                                        onChange={(e) => this.handleFieldChange(e, 'course_number')}
                                        required
                                    />
                                </FormGroup>

                                <h3 className="accountH3">Course Term</h3>
                                <FormGroup controlId="formBasicText" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        placeholder="e.g. Fall 2019"
                                        onChange={(e) => this.handleFieldChange(e, 'semester')}
                                        required
                                    />
                                </FormGroup>

                                <Button style={{backgroundColor: 'orange', color: "white"}} block bsSize="large"
                                        type="submit">
                                    Save
                                </Button>


                            </form>


                        </div>

                    </div>


                </div>
            );
        }
    }
}

export default create_course;