import React, { Component } from 'react';
import { Redirect ,Link} from "react-router-dom"

import {
    Button,
    FormGroup,
    FormControl,
    Row,
    Col,
    Container,
    Jumbotron, /*FormLabel, ControlLabel*/
} from 'react-bootstrap';
import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import icon from '../Images/v.jpg';
import image from '../Images/lab_promo.png'
import GLOBALS from '../Globals';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_success: false,
            login_role:'',
            pathname: {instructor:'/instructor_home',
                        student: '/student_home'},
            to_register: false,
            email_address: '',
            password: '',
            register_role: '',
            errors: '',
        };
    }

    handleCredentialChange = (e, credential) => {
        this.setState({[credential]: e.target.value});
    };

    handleRegisterClick = (e, r) => {
        this.setState({to_register: true,
                register_role: r});
        //
        e.preventDefault();
    };
    handleSubmit = (e) => {
        e.preventDefault();
        alert("logging in");
        const user = {
            email_address: this.state.email_address,
            password: this.state.password
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        //axio sends post request to backend at \login to handle authentication
        //TODO: ask backend to respond with user object including role, names, etc. instead of just 200 OK
        axios.post(GLOBALS.BASE_URL + 'login', user, axiosConfig)
            .then((response) => {
                localStorage.setItem('token', response.data["token"]);
                // alert(response.data["role"])

                this.setState({login_success: true,login_role: response.data["role"]});
                // alert("logging in");

            })
            .catch((error) => {
                // alert("bad?")
                this.setState({
                    errors: 'Error signing up! Try a different username',
                    username: '',
                    password: ''
                });
            }
        );

    };

    render() {
        if (this.state.login_success){
            return <Redirect exact to={{

                pathname: this.state.pathname[this.state.login_role],
                state: {email: this.state.email_address},
            }}/>;
            //student page or instructor page
        }
        if (this.state.to_register) {
            return <Redirect exact to={{
                pathname: "/signup",
                state: {role: this.state.register_role},
            }}/>;
        }

        const errorMessage = this.state.errors;
        return (
            <div>
                {/*banner on top*/}
                <div className="banner">
                    <img src={icon} alt="icon" width="30px" height="30px"/>
                    <label>VirtuLab</label>
                </div>
                {/*Pic and Login*/}
                <div>
                    <Container fluid className="noPadding">
                        <Row className="noMargin full-height">
                            <Col lg={{span: 8}} className="purple">
                                {/*width="60%" height="100%"*/}

                                <Jumbotron className={"noPadding noMargin"}>
                                    <Container>
                                        <h1 className={"loginH1"}>Reach Every Student</h1>
                                        <p className={"loginP"}>
                                            Personalize the learning experience and improve results for each student
                                            with VirtuLab
                                        </p>
                                    </Container>
                                </Jumbotron>

                                <img className="image fill" src={image} alt="labImage"/>

                            </Col>

                            <Col lg={{span: 4, offset: 0}} className={"lightpurple"}>
                                {/*style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}*/}
                                <div className="Login">
                                    <div className="box-container">
                                        {/*<img style={{height: 100, width: '100%' }}src={titleTxt} />*/}
                                        <h2 className="formTitle loginH2">Sign in</h2>
                                        <p className={"loginP"}>
                                            Already registered? Sign in with your VirtuLab account</p>
                                        <form className="login_form " onSubmit={this.handleSubmit}>
                                            <FormGroup controlId="email_address" bsSize="large">
                                                <FormControl
                                                    style={{height: 60}}
                                                    autoFocus
                                                    type="text"
                                                    placeholder="E-mail Address"
                                                    onChange={(e) => this.handleCredentialChange(e, 'email_address')}
                                                    required
                                                />
                                            </FormGroup>
                                            <FormGroup controlId="password" bsSize="large">
                                                <FormControl
                                                    style={{height: 60}}
                                                    onChange={(e) => this.handleCredentialChange(e, 'password')}
                                                    type="password"
                                                    placeholder="Password"
                                                    required
                                                />

                                            </FormGroup>
                                            <p style={{color: 'red'}}> {errorMessage}</p>
                                            <Button style={{backgroundColor: "white", color: "black", height: 60}} block
                                                    bsSize="large" type="submit">
                                                Sign in
                                            </Button>
                                            <h2 className="formTitle loginH2">Register</h2>
                                                {/*either student signup or professor signup*/}
                                                <Button style={{backgroundColor: "white", color: "black", height: 60}}
                                                        block bsSize="large"
                                                        onClick={(e) => this.handleRegisterClick(e, 'student')}>
                                                    Student
                                                </Button>

                                            <div style={{paddingBottom: 20}}>
                                            </div>

                                                <Button style={{backgroundColor: "white", color: "black", height: 60}}
                                                        block bsSize="large"
                                                        onClick={(e) => this.handleRegisterClick(e, 'instructor')}>
                                                    Instructor
                                                </Button>
                                        </form>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                        {/*<Row className="noMargin">*/}
                        {/*    hi*/}
                        {/*</Row>*/}


                    </Container>
                </div>

            </div>
        );

    }

}

export default login;