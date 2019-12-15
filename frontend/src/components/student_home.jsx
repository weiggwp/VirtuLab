import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import StudentHeader from './studentHeader.jsx';

import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
// import 'react-notifications/lib/notifications.css'; // FIXME: DELETE
import icon from '../Images/v.jpg';
import {Button, Image, Navbar, Nav, Form, FormControl, Tooltip, OverlayTrigger} from 'react-bootstrap';

import {Expandable_Classes} from "./expandable_course";
import GLOBALS from "../Globals";
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
            classesWithInCompletesOnly: [],
            classesWithFull: [],
            inputValue: false
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

            email: this.props.email
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
        let classesWithIncompletesOnly=[]
        // console.log("sending email of "+user.email)
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_courses', user, axiosConfig)
            .then((response) => {
                // console.log("email is " +this.props.email)
                // console.log("resp is " +response.json())

                // console.log("resp is "+JSON.stringify(response))
                console.log("----------------------------------------------------")
                console.log(response.data)

                for (let i=0; i<response.data.length; i++){
                    classArray[i]={classname:response.data[i].course_name,classID:response.data[i].courseID,
                        clicked:false, labs:response.data[i].labDTOS, accessCode:response.data[i].code};
                    classesWithIncompletesOnly[i]={classname:response.data[i].course_name,classID:response.data[i].courseID,
                        clicked:false, labs: response.data[i].labDTOS, accessCode:response.data[i].code};

                }

                for (let i=0; i<classesWithIncompletesOnly.length; i++) {
                    let filter = []
                    for(let j = 0; j < classesWithIncompletesOnly[i].labs.length; j++){
                        if (classesWithIncompletesOnly[i].labs[j].complete !== true){
                            console.log("filter")
                            filter.push(response.data[i].labDTOS[j])
                        }
                    }
                    classesWithIncompletesOnly[i]['labs'] = filter
                }

                console.log(classesWithIncompletesOnly)
                console.log("----------------------------------------------------")





                console.log("class arr is ");
                console.log(classArray)

                // console.log("AAA classarray is "+classArray);
                this.setState({
                    classesWithFull: classArray,
                    classesWithIncompletesOnly: classesWithIncompletesOnly,
                    classes:classesWithIncompletesOnly,
                    loading_course:false});
                // this.render()
            })
            .catch((error) => {
                }
            );
    }


    handleAddCourse = (e) => {
        e.preventDefault();

        //alert(this.state.code)
        const course = {
            code: this.state.code,
            email: this.props.email
        };

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
                ToastsStore.success("Enrollment success")
                window.location.reload();

            })
            .catch((error) => {
                    this.setState({
                        errors: 'Error! No course found with the code.',
                        code: '',
                    });
                // console.log(error.toString());

                ToastsStore.error("Course ID not found, or you\n are already enrolled in course.")
                }
            );

    };

    handleCheckBox(){

    }

    updateInputValue(e) {
        let isChecked = e.target.checked;
        if (isChecked) {
            this.setState({
                classes: this.state.classesWithFull,
            })
        } else{
            this.setState({
                classes: this.state.classesWithIncompletesOnly,
            })
        }

    }


    render() {
         if (this.state.loading_course){
            // console.log("loading classes", this.state.classes);
            this.updateClasses();
            return null;


        }
        else
         {
             // console.log("classes is "+this.state.classes);
        return(

            <div>
                {this.renderRedirect()}
                <StudentHeader currentTab="Courses"/>

                <Navbar>
                    <Navbar.Brand href="#student_home">Welcome!</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {this.props.email}
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
                                <input type="checkbox" onClick={() => this.handleCheckBox()} onChange={e => this.updateInputValue(e)}/>
                                <span className="checkmark">

                                    </span>
                            </label>
                            <OverlayTrigger
                                overlay={
                                    <Tooltip>
                                        Account Setting
                                    </Tooltip>
                                }
                            >
                                <Link to="/account_settings">
                                    <Image  className={"config_image"} src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded />
                                </Link>
                            </OverlayTrigger>
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