import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import icon from "../Images/v.jpg";
import {Button, Col, Container, FormControl, FormGroup, Image, Nav, Navbar, Row} from "react-bootstrap";
import '../stylesheets/account_settings.css';
import {Droppable_course} from './droppable_course.jsx'
import axios from "axios";
import GLOBALS from "../Globals";

export class assign_lab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instructor: props.instructor,
            due_date: '',
            classcode: '',
            selected_lab_id:' ',
            redirect: false,
            errors: '',
        };
    }

    handleFieldChange = (e, field) => {
        this.setState({[field]: e.target.value});
    };
    handleAddClass(){
        let classcode = this.state.classcode;
        let lab = this.state.select;
        var lablist = [];
        lablist[0]=lab;
        console.log("classcode is "+classcode+" lab is " +lab)
        const course= {
            course_number: classcode,
            labs: lablist
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        var classArr=[];
        var classArray=[];

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'add_lab_class', course, axiosConfig)
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
                            <form onSubmit={this.handleAddClass}>
                                <h1 className={"accountH1"}>Add Lab to Class</h1>
                                <h3 className="accountH3">Course</h3>

                                <FormGroup controlId="formBasicText" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        placeholder="Course Name"
                                        onChange={(e) => this.handleFieldChange(e, 'course_name')}
                                        required
                                    />
                                </FormGroup>


                                <h3 className="accountH3">Due Date</h3>
                                <FormGroup controlId="formBasicText" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="text"
                                        placeholder="e.g. Fall 2019"
                                        onChange={(e) => this.handleFieldChange(e, 'due_date')}
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

export default assign_lab;