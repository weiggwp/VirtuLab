import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Button, FormGroup, FormControl, FormLabel, ControlLabel, Row, Col, Container} from 'react-bootstrap';
import icon from "../Images/v.jpg";
import axios from 'axios';
import '../stylesheets/banner.css';
import '../stylesheets/signup.css';
import GLOBALS from '../Globals';

// const GLOBAL = require('../Globals');

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            first_name: '',
            last_name:'',
            email_address:'',
            password: '',
            confirm_password:'',
            errors: '',
            authenticated: false
        };
        //this.authenticate();
    }

    handleFieldChange = (e, field) => {
        this.setState({ [field]: e.target.value });
    };

    handleSignUp = (e) => {
        const user = {
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            email_address:this.state.email_address,
            password: this.state.password,
            // confirm_password:this.state.confirm_password,
        };
        e.preventDefault();
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'

        axios.post(GLOBALS.BASE_URL + 'signup', user, axiosConfig).then(
            (response) => {
                console.log("Sending response")
                console.log(response);
                this.setState({ redirect: true });
            },
            (error) => {
                console.log("reject logging message")
                this.setState({
                    errors: 'Error signing up! Try a different username',
                    username: '',
                    password: ''
                });
            }
        );
    };

    render() {
        if (this.state.authenticated) {
            return <Redirect exact to="/login" />;
        }
        if (this.state.redirect) {
            return <Redirect exact to="/login" />;
        } else {
            const errorMessage = this.state.errors;
            return (
                <div >
                    <div className="banner">

                        <img src={icon} alt="icon" width="30px" height="30px"/>
                        <label >VirtuLab</label>
                    </div>


                    <Container className="noPadding">
                        <Row className="noMargin">
                            <Col lg={{span:5}} style={{justifyContent:'center', alignItems:'center', height: '100vh'}}>
                                <h1 className={"signupH1"}>Join the <br/>VirtuLab <br/>Community<br/></h1>

                                <p className={"signupP"}>
                                    Discover new ways to conduct <br/> experiments and share costly<br/>equipment and resources
                                </p>
                            </Col>
                            <Col lg={{span:7, offset:0}} className={"lightblue"}>
                                <div className="Signup" >
                                    <form className="signup_form" onSubmit={this.handleSignUp}>
                                    <Container>
                                        <Row>
                                            <Col md={{span:5,offset:0}}>
                                                <h2 className="signupH2">First Name</h2>

                                            </Col>
                                            <Col md={{ span: 5, offset: 0 }}>

                                                <h2 className="signupH2">Last Name</h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ span: 5, offset: 0 }}>
                                                <FormGroup controlId="formBasicText" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="First Name"
                                                        onChange={(e) => this.handleFieldChange(e, 'first_name')}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ span: 5, offset: 0 }}>
                                                <FormGroup controlId="formBasicText" bsSize="large">
                                                    <FormControl
                                                        onChange={(e) => this.handleFieldChange(e, 'last_name')}
                                                        type="text"
                                                        placeholder="Last Name"
                                                        required
                                                    />
                                                </FormGroup>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{span:5,offset:0}}>
                                                <h2 className="signupH2">Email Address</h2>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ span: 10, offset:0 }}>
                                                <FormGroup controlId="formBasicText" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Email Address"
                                                        onChange={(e) => this.handleFieldChange(e, 'email_address')}
                                                        required
                                                    />
                                                </FormGroup>

                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col md={{span:5,offset:0}}>
                                                <h2 className="signupH2">Password</h2>

                                            </Col>
                                            <Col md={{ span: 5, offset: 0 }}>

                                                <h2 className="signupH2">Confirm Password</h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ span: 5, offset: 0 }}>
                                                <FormGroup controlId="formBasicText" bsSize="large">
                                                    <FormControl
                                                        autoFocus
                                                        type="password"
                                                        placeholder="Password"
                                                        onChange={(e) => this.handleFieldChange(e, 'password')}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ span: 5, offset: 0 }}>
                                                <FormGroup controlId="formBasicText" bsSize="large">
                                                    <FormControl
                                                        onChange={(e) => this.handleFieldChange(e, 'confirm_password')}
                                                        type="password"
                                                        placeholder="Enter Password"
                                                        required
                                                    />
                                                </FormGroup>

                                            </Col>
                                        </Row>
                                        <Row style={{paddingTop:20}}>
                                            <Col md={{ span: 5, offset: 0 }}>
                                                <Button style={{ backgroundColor: 'blue',color:"white"}} block bsSize="large" type="submit">
                                                    Create Student Account
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Container>
                                    </form>


                                </div>
                            </Col>
                        </Row>
                    </Container>


                </div>
            );
        }
    }

}

export default signup;