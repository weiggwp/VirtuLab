import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import StudentHeader from './studentHeader.jsx';

import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import icon from '../Images/v.jpg';
import {Button, Image, Navbar, Nav, Form, FormControl} from 'react-bootstrap';

import {Expandable_Classes} from "./expandable_course";
// import axios from "axios";
import GLOBALS from "../Globals";


class student_home extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            redirect:false,
            collapseID: "collapse3",
            code: '',
            user: '',


        };
    }
    renderRedirect = () => {
        if (this.state.redirectAcct) {
            return <Redirect to='/do_lab' />
        }

    };

    handleFieldChange = (e, field) => {
        this.setState({[field]: e.target.value});
    };

    handleAddCourse = (e) => {
        e.preventDefault();

        const course = {
            code: this.state.code,
        };
        console.log(this.state.code)
        alert(this.state.code)
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_course', course, axiosConfig)
            .then((response) => {
                //TODO: ask backend to respond with course object, else error
                // this.setState({login_success: true});
            })
            .catch((error) => {
                    this.setState({
                        errors: 'Error! No course found with the code.',
                        code: '',
                    });
                }
            );

    };



    render() {


        return(

            <div>
                {this.renderRedirect()}
                <StudentHeader/>

                <Navbar>
                    <Navbar.Brand href="#student_home">Welcome!</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: SummerBagel
                        {/*    <a href="#login"> </a>*/}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                {/*<Navbar>*/}
                {/*<Button className={"tab"}>Courses</Button>*/}
                {/*</Navbar>*/}

                <div >
                    <Navbar style={{backgroundColor:"lightgray", marginLeft:40,marginRight:40}}  className={"justify-content-between"}>

                        <Nav >
                            <Form inline onSubmit={this.handleAddCourse}>
                                <FormControl type="text" placeholder="Course Code" className="add course"
                                             onChange={(e) => this.handleFieldChange(e, 'code')}
                                />

                                <Button type="submit" style={{backgroundColor: "#e88f65ff"}} variant="primary">Add
                                    Course</Button>
                            </Form>



                        </Nav>

                        <Nav >
                            <label className="contain">
                                Show Completed Labs
                                <input type="checkbox"/>
                                <span className="checkmark">

                                    </span>
                            </label>
                            <Link to="/account_settings">
                                <Image  className={"config_image"} src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded />
                            </Link>
                        </Nav>

                    </Navbar>
                </div>

                {<Expandable_Classes style={"settingsH3"}/>}
               { <add_course />}

            </div>



        )
    }
}
export default student_home;