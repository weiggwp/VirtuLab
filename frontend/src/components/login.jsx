import React, { Component } from 'react';
import { Redirect ,Link} from "react-router-dom"

import {Button, FormGroup, FormControl, Row, Col, Container, Jumbotron, FormLabel, ControlLabel} from 'react-bootstrap';
import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import icon from '../Images/v.jpg';
import image from '../Images/lab_promo.png'


class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            email_address: '',
            password: '',
            errors: ''
        };
    }

    handleCredentialChange = (e, credential) => {
        this.setState({[credential]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
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
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post('http://localhost:5000/login', user, axiosConfig)
            .then((response) => {
                console.log(response);
                this.setState({redirect: true});
            })
            .catch((error) => {
                this.setState({
                    errors: 'Error signing up! Try a different username',
                    username: '',
                    password: ''
                });
            }
        );

    };

    render() {
        if (this.state.redirect) {
            return <Redirect exact to='/student_home'/>;
            //student page or instructor page
        }
        console.log("redirect is false");
        const errorMessage = this.state.errors;
        return (
            <div>
                <div className="banner">

                    <img src={icon} alt="icon" width="30px" height="30px"/>
                    <label>VirtuLab</label>
                </div>
                <div>
                    <Container fluid className="noPadding">
                        <Row className="noMargin">
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

                                <img className="image" src={image} alt="labImage"/>

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
                                            <Link to="/signup">
                                                {/*either student signup or professor signup*/}
                                                <Button style={{backgroundColor: "white", color: "black", height: 60}}
                                                        block bsSize="large" type="submit">
                                                    Student
                                                </Button>
                                            </Link>

                                            <div style={{paddingBottom: 20}}>
                                            </div>
                                            <Link to="/signup">

                                                <Button style={{backgroundColor: "white", color: "black", height: 60}}
                                                        block bsSize="large" type="submit">
                                                    Instructor
                                                </Button>
                                            </Link>
                                        </form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            </div>
        );

    }

}

export default login;