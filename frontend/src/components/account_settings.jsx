import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import icon from "../Images/v.jpg";
import {Button, Col, Container, FormControl, FormGroup, Row} from "react-bootstrap";
import '../stylesheets/account_settings.css';
import {Classes} from './classes.jsx'

export class account_settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            errors: '',
            old_password:'',
            new_password:'',
            confirm_new_password:'',
        //     classes:["Class 1: Study of Organisms and Behaviors| Fall 2019",'Class 2: Introduction to General Chemistry| Fall 2019']
        //
        };
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const customer = {
    //         credentials: this.buildCredentials(),
    //         address: this.buildAddress()
    //     };
        // fetch('http://localhost:8000/customers/' + this.state.customer.credentials.username + '/', {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'jwt ' + localStorage.getItem('token')
        //     },
        //     body: JSON.stringify(customer)
        // })
        //     .then((res) => res.json())
        //     .then((json) => {
        //         console.log(json);
        //         this.setState({ redirect: true });
        //         this.props.update({ alreadyLoaded: false });
        //     });
    // };


    render() {
        if (this.state.redirect) {
            return <Redirect exact to="/account_settings" />;
        } else {
            return (
                <div>

                    <div className="banner">

                        <img src={icon} alt="icon" width="30px" height="30px"/>
                        <label >VirtuLab</label>
                    </div>
                    <div className={"lightblue centered"}>

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
                                    <form onSubmit={this.handleSignUp}>


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
                                                            type="text"
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


                            {<Classes style={"accountH3"}/>}

                            <Row style={{paddingTop:20}}>
                                <Col md={{ span: 1, offset: 2 }}>
                                    <Button style={{ backgroundColor: 'orange',color:"white"}} block bsSize="large" type="submit">
                                        Save
                                    </Button>
                                </Col>
                            </Row>





                        </Container>
                    </div>





                </div>
            );
        }
    }
}

export default account_settings;