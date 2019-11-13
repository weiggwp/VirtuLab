import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import StudentHeader from './studentHeader.jsx';

import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import 'react-notifications/lib/notifications.css';
import icon from '../Images/v.jpg';
import {Button, Image, Navbar, Nav, Form, FormControl} from 'react-bootstrap';

import {Expandable_Classes} from "./expandable_course";
import GLOBALS from "../Globals";
import NotificationManager from 'react-notifications';
import Toast from 'light-toast';
import {ToastsContainer, ToastsStore} from 'react-toasts';

class student_home extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            redirect:false,
            collapseID: "collapse3",
            code: '',
            user: '',
            loading_course:true,
            classes:[],
        };
    }
    renderRedirect = () => {
        if (this.state.redirectAcct) {
            return <Redirect to='/do_lab' />
        }

    };
    handleFieldChange = (e, field) => {
        this.setState({ [field]: e.target.value });

    };
    updateClasses(){
        const user = {
            email_address:this.props.email
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
        axios.post(GLOBALS.BASE_URL + 'student_home', user, axiosConfig)
            .then((response) => {
                console.log("email is " +this.props.email)
                // console.log("resp is " +response.json())
                console.log("dat is " + JSON.stringify(response));
                console.log("resp is " +response.data[0].labs);
                console.log("resp is " +response.data[0].courseName);


                for (let i=0; i<response.data.length; i++){
                    classArray[i]={classname:response.data[i].courseName,classID:response.data[i].courseID,
                        clicked:false,labs:response.data[i].labs};
                    console.log("class array[i] is " +classArray[i].classname+" labs are "+classArray[i].labs)
                }
                // console.log("AAA classarray is "+classArray);
                this.setState({classes:classArray,loading_course:false});
            })
            .catch((error) => {
                }
            );
    }


    handleAddCourse = (e) => {
        e.preventDefault();

        const course = {
            course_number: this.state.code,
        };
        const user={

        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'enroll',course,axiosConfig)
            .then((response) => {

                window.location.reload();
                console.log("success!");
            })
            .catch((error) => {
                    this.setState({
                        errors: 'Error! No course found with the code.',
                        code: '',
                    });
                console.log("failure...");

                ToastsStore.error("Course ID not found.")
                }
            );

    };



    render() {
         if (this.state.loading_course){
            console.log("loading classes", this.state.classes);
            this.updateClasses();
            return null;


        }
        else
         {
             console.log("classes is "+this.state.classes);
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
                                <FormControl type="text"onChange={(e) => this.handleFieldChange(e, 'code')}
                                             placeholder="Course Code" className="add course"/>
                                <Button type="submit" style={{backgroundColor: "#e88f65ff"}} variant="primary">Add
                                    Course</Button>
                                <ToastsContainer store={ToastsStore}/>

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

                {<Expandable_Classes style={"settingsH3"}classes={this.state.classes}/>}
               { <add_course />}

            </div>



        )
    }}
}
export default student_home;