import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, FormGroup, FormControl, FormLabel, ControlLabel, Row, Col, Container, Form} from 'react-bootstrap';
import icon from "../Images/v.jpg";
import axios from 'axios';
import '../stylesheets/banner.css';
import '../stylesheets/signup.css';
import GLOBALS from '../Globals';
import {ToastsContainer, ToastsStore} from 'react-toasts';

// const GLOBAL = require('../Globals');

class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: props.location.state.role, // assume redirected from login page
            redirect: false,
            first_name: '',
            last_name: '',
            email_address: '',
            password: '',
            confirm_password: '',
            formErrors: {email: '', password: '', confirm_password:''},
            emailValid: false,
            passwordValid: false,
            password2Valid: false,
            formValid: false,


            errors: '',
            authenticated: false
        };
        //this.authenticate();
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let password2Valid = this.state.password2Valid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
                break;
            case 'confirm_password':
                password2Valid = value===this.state.password;
                fieldValidationErrors.confirm_password = password2Valid ? '' : 'Passwords do not match';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);

    }

    handleFieldChange = (e, field) => {
        const value = e.target.value;
        this.setState({[field]: value}, () => {
            this.validateField(field, value)
        });

    };

    handleSignUp = (e) => {
        e.preventDefault();

        if (this.state.password !== this.state.confirm_password) {
            this.setState({
                errors: 'Error: Passwords do not match.',
                username: '',
                password: '',
                confirm_password: ''
            });
            return;
        }
        if (this.state.password.length <= 3) {
            //console.log("pass is "+this.state.password)
            this.setState({
                errors: 'Error: Password must be at least 4 characters.',
                username: '',
                password: '',
                confirm_password: ''
            });
            return;
        }
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email_address,
            password: this.state.password,
            role: this.state.role,
            // isStudent: String(this.state.role === "student")
            // confirm_password:this.state.confirm_password,
        };
        // alert(user.isStudent);

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
                // console.log(response);
                ToastsStore.success("signed up successfully")

                this.setState({redirect: true});
            },
            (error) => {
                this.setState({

                    errors: "There is already an account registered with that e-mail address.",
                    username: '',
                    password: ''
                });
            }
        );
    };


    FormErrors = (formErrors, key="") =>
        <div>
            {Object.keys(formErrors).map((fieldName, i) => {
                if (key!=="" && key===fieldName){
                    if (formErrors[fieldName].length > 0) {
                        return (
                            <p style={{color:"red"}} key={i}>{formErrors[fieldName]}</p>
                        )
                    }
                }
                else if ( key==="" && formErrors[fieldName].length > 0) {
                    return (
                        <p style={{color:"red"}} key={i}> {formErrors[fieldName]}</p>
                    )
                } else {
                    return '';
                }
            })}
        </div>

    banner() {
        return (
            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )

    }

    form() {
        return (
            <div className="Signup">

                <form className="signup_form" onSubmit={this.handleSignUp}>
                    <Container>
                        <Row>
                            <Col md={{span: 5, offset: 0}}>
                                <h2 className="signupH2">First Name</h2>

                            </Col>
                            <Col md={{span: 5, offset: 0}}>

                                <h2 className="signupH2">Last Name</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{span: 5, offset: 0}}>
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
                            <Col md={{span: 5, offset: 0}}>
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
                            <Col md={{span: 5, offset: 0}}>
                                <h2 className="signupH2">Email Address</h2>

                            </Col>
                        </Row>

                        <Row>
                            <Col md={{span: 10, offset: 0}}>
                                <FormGroup controlId="formBasicText" bsSize="large">
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        placeholder="Email Address"
                                        onChange={(e) => this.handleFieldChange(e, 'email_address')}
                                        required
                                    />
                                </FormGroup>

                            </Col>

                        </Row>
                        <Row>
                            <Col md={{span: 5, offset: 0}}>
                                <h2 className="signupH2">Password</h2>


                            </Col>
                            <Col md={{span: 5, offset: 0}}>

                                <h2 className="signupH2">Confirm Password</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{span: 5, offset: 0}}>
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
                            <Col md={{span: 5, offset: 0}}>
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
                        <Row>
                            <Col md={{span: 5, offset: 0}}>
                            {this.FormErrors(this.state.formErrors,"password")}
                            </Col>
                            <Col md={{span: 5, offset: 0}}>
                                {this.FormErrors(this.state.formErrors,"confirm_password")}
                            </Col>
                        </Row>
                        <Row style={{paddingTop: 20}}>
                            <Col md={{span: 5, offset: 0}}>
                                <Button style={{backgroundColor: 'blue', color: "white"}} block bsSize="large"
                                        type="submit">
                                    Create {this.state.role} Account
                                </Button>
                            </Col>
                        </Row>

                        {/*<FormErrors formErrors={this.state.formErrors} />*/}



                    </Container>
                </form>


            </div>
        )
    }

    // form2() {
    //
    //     // const [validated, setValidated] = useState(false);
    //     //
    //     const handleSubmit = event => {
    //         const form = event.currentTarget;
    //         if (form.checkValidity() === false) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //         }
    //
    //         this.setState({formValid:true});
    //         // setValidated(true);
    //     };
    //     return (
    //         <Form noValidate validated={this.state.formValid} onSubmit={handleSubmit}>
    //             <Form.Row>
    //                 <Form.Group as={Col} md="4" controlId="validationCustom01">
    //                     <Form.Label>First name</Form.Label>
    //                     <Form.Control
    //                         required
    //                         type="text"
    //                         placeholder="First name"
    //                     />
    //                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    //                 </Form.Group>
    //                 <Form.Group as={Col} md="4" controlId="validationCustom02">
    //                     <Form.Label>Last name</Form.Label>
    // {/*                    <Form.Control*/}
    // {/*                        required*/}
    // //                         type="text"
    // //                         placeholder="Last name"
    // //                     />
    // {/*                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>*/}
    // {/*                </Form.Group>*/}
    //                 <Form.Group as={Col} md="4" controlId="validationCustomUsername">
    //                     <Form.Label>Username</Form.Label>
    //                     <InputGroup>
    //                         <InputGroup.Prepend>
    //                             <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
    //                         </InputGroup.Prepend>
    //                         <Form.Control
    //                             type="text"
    //                             placeholder="Username"
    //                             aria-describedby="inputGroupPrepend"
    //                             required
    //                         />
    //                         <Form.Control.Feedback type="invalid">
    //                             Please choose a username.
    //                         </Form.Control.Feedback>
    //                     </InputGroup>
    //                 </Form.Group>
    //             </Form.Row>
    //             <Form.Row>
    //                 <Form.Group as={Col} md="6" controlId="validationCustom03">
    //                     <Form.Label>City</Form.Label>
    // {/*                    <Form.Control type="text" placeholder="City" required/>*/}
    // {/*                    <Form.Control.Feedback type="invalid">*/}
    // //                         Please provide a valid city.
    // //                     </Form.Control.Feedback>
    // //                 </Form.Group>
    // {/*                <Form.Group as={Col} md="3" controlId="validationCustom04">*/}
    // {/*                    <Form.Label>State</Form.Label>*/}
    //                     <Form.Control type="text" placeholder="State" required/>
    //                     <Form.Control.Feedback type="invalid">
    //                         Please provide a valid state.
    //                     </Form.Control.Feedback>
    //                 </Form.Group>
    //                 <Form.Group as={Col} md="3" controlId="validationCustom05">
    //                     <Form.Label>Zip</Form.Label>
    //                     <Form.Control type="text" placeholder="Zip" required/>
    //                     <Form.Control.Feedback type="invalid">
    //                         Please provide a valid zip.
    //                     </Form.Control.Feedback>
    //                 </Form.Group>
    //             </Form.Row>
    //             <Form.Group>
    //                 <Form.Check
    //                     required
    //                     label="Agree to terms and conditions"
    //                     feedback="You must agree before submitting."
    //                 />
    //             </Form.Group>
    //             <Button type="submit">Submit form</Button>
    //         </Form>
    //
    //
    //     )
    // }

    render() {

        if (this.state.authenticated) {
            return <Redirect exact to="/login"/>;
        }
        if (this.state.redirect) {
            return <Redirect exact to="/login"/>;
        } else {
            const errorMessage = this.state.errors;
            return (

                <div>
                    {this.banner()}

                    <Container className="noPadding">
                        <Row className="noMargin">
                            <Col lg={{span: 5}}
                                 style={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                                <h1 className={"signupH1"}>Join the <br/>VirtuLab <br/>Community<br/></h1>

                                <p className={"signupP"}>
                                    Discover new ways to conduct <br/> experiments and share costly<br/>equipment and
                                    resources
                                </p>
                            </Col>
                            <Col lg={{span: 7, offset: 0}} className={"lightblue"}>
                                {this.form()}
                            </Col>
                        </Row>
                    </Container>


                </div>
            );
        }
    }

}

export default signup;