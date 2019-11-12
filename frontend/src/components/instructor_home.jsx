import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import InstructorHeader from "./instructorHeader";
// import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import '../stylesheets/instructor_home.css';
import icon from '../Images/v.jpg';
import {Button, Image, Navbar, NavItem, InputGroup, Nav} from 'react-bootstrap';


import image from '../Images/lab_promo.png'
import login from "./login";
import {Droppable_course} from "./droppable_course";
import {Expandable_Classes} from "./expandable_course";
import axios from "axios";
import GLOBALS from "../Globals";


class instructor_home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inCoursePage: true,
            redirectAcct: false,
            redirectCourse: false,
            redirectLab: false,
            loading_course:true,
            classes:[],
        };
    }

    setRedirectAcct = () => {
        this.setState({
            redirectAcct: true
        })
    }
    setRedirectCourse = () => {
        this.setState({
            redirectCourse: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirectAcct) {
            return <Redirect to='/account_settings'/>
        }
        // else if(this.state.redirectCourse){
        //     return <Redirect to='/add_course' />
        // }
        // else
        // {
        //     return <Redirect to='/do_lab' />
        // }
    }

    updateClasses(){
        const user = {

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
                // console.log("resp is " +response.json())
                console.log("dat is " + JSON.stringify(response));
                console.log("resp is " +response.data[0].courseID);
                console.log("resp is " +response.data[0].courseName);
                for (let i=0; i<response.data.length; i++){
                    classArr[i]=response.data[i]

                }
                var classArray=[];

                for (let i=0; i<response.data.length; i++){
                    classArray[i]={classname:response.data[i].courseName,classID:response.data[i].courseID,
                        clicked:false,labs:response.data[i].labs};
                    console.log("class array[i] is " +classArray[i].classname)
                }
                // console.log("AAA classarray is "+classArray);
                this.setState({classes:classArray,loading_course:false});
            })
            .catch((error) => {
                }
            );
    }

    setRedirectLab = () => {
        this.setState({
            redirectLab: true
        })
    }

    render() {

        if (this.state.loading_course){
            console.log("loading classes", this.state.classes);
            this.updateClasses();
            return null;


        }
        else


        return (
            <div>
                {this.renderRedirect()}
                <InstructorHeader/>
                <Navbar>
                    <Navbar.Brand href="#instructor_home">Welcome!</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: SummerBagel
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Navbar style={{    marginLeft:"30px"}}>
                    <Button className="tabs" href="instructor_home">Course</Button>
                    <Button className="tabs" href="instructor_labs">Lab</Button>
                </Navbar>

                <div>
                    <div>
                        <Navbar style={{backgroundColor: "lightgray", marginLeft: 40, marginRight: 40}}
                                className={"justify-content-between"}>
                            <Nav>
                                <Button href="create_course" style={{backgroundColor: "#e88f65ff"}} variant="primary">Create
                                    Course</Button>
                            </Nav>

                            <Nav>
                                <Image onClick={this.setRedirectAcct} className={"config_image"}
                                       src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                            </Nav>
                        </Navbar>
                    </div>
                    {<Expandable_Classes style={"settingsH3"}classes={this.state.classes}/>}


                </div>
            </div>


        )
    }
}

export default instructor_home;