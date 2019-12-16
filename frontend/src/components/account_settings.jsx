import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import icon from "../Images/v.jpg";
import {Button, Col, Container, FormControl, FormGroup, Row} from "react-bootstrap";
import '../stylesheets/account_settings.css';
import {Droppable_course} from './droppable_course.jsx'
import axios from "axios";
import GLOBALS from "../Globals";
import InstructorHeader from "./instructorHeader";

export class account_settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            errors: '',
            old_password:'',
            new_password:'',
            confirm_new_password:'',
            loading_course:true,
            classes:[],
        //     classes:["Class 1: Study of Organisms and Behaviors| Fall 2019",'Class 2: Introduction to General Chemistry| Fall 2019']
        //
        };
    }
    handleFieldChange = (e, field) => {
        this.setState({ [field]: e.target.value });
    };

    handleSubmit = (e) => {

        e.preventDefault();


        if(this.state.new_password!==this.state.confirm_new_password)
        {
            this.setState({
                errors: 'Error: Passwords do not match.',

            });
            return;
        }
        if(this.state.new_password.length<=3)
        {
            this.setState({
                errors: 'Error: Password must be at least 4 characters.',

            });
            return;
        }
        const user = {
            email: this.props.email,
            password: this.state.old_password,
            role:this.state.new_password
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        //axio sends post request to backend at \login to handle authentication

        axios.post(GLOBALS.BASE_URL + 'change_password', user, axiosConfig)
            .then((response) => {
                localStorage.setItem('token', response.data["token"]);
                // alert(response.data["role"])

                this.setState({
                    errors: 'Password Successfully changed!',

                });
                // alert("logging in");

            })
            .catch((error) => {
                    // alert("bad?")
                    this.setState({
                        errors: 'Invalid Password entered for old password.',

                    });
                }
            );

    };




    updateClasses(){
        const user = {
            email:this.props.email

        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'responseType': 'json'
            }
        };
        var classArr=[];
        var classArray=[];

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_courses', user, axiosConfig)
            .then((response) => {

                for (let i=0; i<response.data.length; i++){
                    classArr[i]=response.data[i]

                }
                var classArray=[];

                for (let i=0; i<response.data.length; i++){
                    classArray[i]={classname:response.data[i].course_name,classID:response.data[i].course_id,
                        clicked:false};

                }
                this.setState({classes:classArray,loading_course:false});
            })
            .catch((error) => {
                }
            );
    }


    render() {
        if (this.state.redirect) {
            if(this.props.role==="student")
                return <Redirect exact to="/student_home" />;
            else
                return <Redirect exact to="/instructor_home" />
        }
        else if (this.state.loading_course){
            this.updateClasses();
            return null;


        }

        else
        {const errorMessage = this.state.errors;

            return (
                <div>
                    <InstructorHeader currentTab="Account"/>

                    <div className={"back centered"}>

                    <Container fluid className="noPadding">
                        <Row className="noMargin">
                            <Col lg={{span:6, offset:2}} >
                                <h1 className={"accountH1"}>Account Settings</h1>
                            </Col>
                        </Row>

                        <Row className="noMargin" >

                            <Col lg={{span:6, offset:2}} >

                                <h2 className="accountH2">Change Password</h2>
                            </Col>
                        </Row>


                                <div className="Account" >
                                    <form onSubmit={this.handleSubmit}>


                                            <Row className={"noMargin"}>
                                                <Col md={{span:6,offset:2}} >
                                                    <h3 className="accountH3">Old password</h3>

                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={{ span: 6, offset: 2 }}>
                                                    <FormGroup controlId="formBasicText" bsSize="large">
                                                        <FormControl
                                                            autoFocus
                                                            type="password"
                                                            placeholder="Old Password"
                                                            onChange={(e) => this.handleFieldChange(e, 'old_password')}
                                                            required
                                                        />
                                                    </FormGroup>

                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col md={{span:3,offset:2}}>
                                                    <h3 className="accountH3">New Password</h3>

                                                </Col>
                                                <Col md={{ span: 5, offset: 0 }}>

                                                    <h3 className="accountH3">Confirm New Password</h3>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={{ span: 3, offset: 2 }}>
                                                    <FormGroup controlId="formBasicText" bsSize="large">
                                                        <FormControl
                                                            autoFocus
                                                            type="password"
                                                            placeholder="New Password"
                                                            onChange={(e) => this.handleFieldChange(e, 'new_password')}
                                                            required
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={{ span: 3, offset: 0 }}>
                                                    <FormGroup controlId="formBasicText" bsSize="large">
                                                        <FormControl
                                                            onChange={(e) => this.handleFieldChange(e, 'confirm_new_password')}
                                                            type="password"
                                                            placeholder="Enter Password"
                                                            required
                                                        />
                                                    </FormGroup>

                                                </Col>

                                            </Row>
                                            <Row style={{paddingTop:20}}>
                                                <Col md={{ span: 1, offset: 2 }}>
                                                    <Button onSubmit={this.handleSubmit}
                                                            style={{ backgroundColor: 'orange',color:"white"}} block bsSize="large" type="submit">
                                                        Save
                                                    </Button>
                                                </Col>
                                            </Row>
                                        <Row>
                                            <Col >
                                                <b>{errorMessage}</b>
                                          </Col>
                                        </Row>
                                        {/*</Container>*/}
                                    </form>


                                </div>
                            {/*</Col>*/}
                        {/*</Row>*/}

                    </Container>



                        <Container fluid style={{paddingTop:20}}>


                            <Row className="noMargin" >

                                <Col lg={{span:6, offset:2}} >

                                    <h2 className="accountH2">Manage Classes</h2>
                                </Col>
                            </Row>


                            {<Droppable_course style={"accountH3"} classes={this.state.classes} email={this.props.email}/>}






                        </Container>
                    </div>





                </div>
            );
        }
    }
}

export default account_settings;