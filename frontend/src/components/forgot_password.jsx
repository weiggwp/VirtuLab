import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Button, FormGroup, FormControl, FormLabel, ControlLabel, Row, Col, Container} from 'react-bootstrap';
import icon from "../Images/v.jpg";
import axios from 'axios';
import '../stylesheets/banner.css';
import '../stylesheets/signup.css';
import GLOBALS from '../Globals';

// const GLOBAL = require('../Globals');

class forgot_password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: props.location.state.role, // assume redirected from login page
            redirect: false,
            email_address:'',
            confirmation: '',
            authenticated: false
        };
        //this.authenticate();
    }

    handleFieldChange = (e, field) => {
        this.setState({ [field]: e.target.value });
    };

    handleReset = (e) => {
        e.preventDefault();


        const user = {

            email:this.state.email_address,

            // isStudent: String(this.state.role === "student")
            // confirm_password:this.state.confirm_password,
        };
        // alert(user.isStudent);
        console.log(JSON.stringify(user));

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'

        axios.post(GLOBALS.BASE_URL + 'forgot_password', user, axiosConfig).then(
            (response) => {
                // console.log(response);
                // alert("Signed up successfully");
                //console.log(response);
                this.setState({ confirmation: 'E-mail sent. It may take a couple of minutes to appear.'});

            },
            (error) => {
                console.log(error);
                this.setState({
                    confirmation: "We could not find that e-mail address.",

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
                                <div className="Reset" >
                                    <form className="reset_form" onSubmit={this.handleReset}>
                                        <Container>
                                            <Row>
                                                <Col md={{span:10,offset:0}}>
                                                    <h2 className="signupH2">Enter e-mail address</h2>

                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col md={{ span: 10, offset: 0 }}>
                                                    <FormGroup controlId="formBasicText" bsSize="large">
                                                        <FormControl
                                                            autoFocus
                                                            type="text"
                                                            placeholder="e-mail address"
                                                            onChange={(e) => this.handleFieldChange(e, 'email_address')}
                                                            required
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={{ span: 10, offset: 0 }}>
                                                <Button style={{ span:10,backgroundColor: 'blue',color:"white"}} block bsSize="large" type="submit">
                                                    E-mail me
                                                </Button>
                                                </Col>
                                                {this.state.confirmation}
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

export default forgot_password;