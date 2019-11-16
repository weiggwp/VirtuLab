import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

// import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import icon from '../Images/v.jpg';
import {Button, Image, Navbar, NavItem, InputGroup, Nav, NavDropdown, Row, Col} from 'react-bootstrap';

import {Expandable_Classes} from "./expandable_course";
import Card from "react-bootstrap/Card";
import axios from "axios";
import GLOBALS from "../Globals";
import InstructorHeader from "./instructorHeader";

class PublicLab {
    constructor(id, name, author, keywords, description) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.keywords = keywords;
        this.description = description;
    }


}

class public_labs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            redirectAcct: false,
            redirectCourse: false,
            redirectLab: false,
            loading_labs:true,
            labs: [
                new PublicLab(0,
                    "Intro to Beakers",
                    "Noob",
                    "Beaker, Intro, Break, Solution",
                    "Student will learn how to use beaker in lab setting"),
                new PublicLab(1,
                    "Dilution",
                    "Anonymous",
                    "Beaker, Chemicals, Solution, Reaction",
                    "Student will learn how to use mix solution with different concentrations"),
            ]


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
    setRedirectLab = () => {
        this.setState({
            redirectLab: true
        })
    }


    updateLabs(){
        const user = {

        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'responseType': 'json'
            }
        };

        var labArray=[];

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_public_labs',  axiosConfig)
            .then((response) => {
                // console.log("resp is " +response.json())
                console.log("data is "+JSON.stringify(response))


                for (let i=0; i<response.data.length; i++){

                    labArray[i]={name:response.data[i].name,author:response.data[i].creator,
                        keywords:response.data[i].tags,description:response.data[i].description};

                }
                // console.log("AAA classarray is "+classArray);
                this.setState({labs:labArray,loading_labs:false});
            })
            .catch((error) => {
                console.log(error +" is the error")
                }
            );
    }


    render() {
        if (this.state.loading_labs){
            this.updateLabs();
            return null;
        }
        let labs = this.state.labs;
        return (

            <div>
                {this.renderRedirect()}
                <InstructorHeader currentTab="Labs"/>

                <Navbar>
                    {/*<Navbar.Brand href="#student_home"> Back to Home</Navbar.Brand>*/}
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: SummerBagel
                            {/*    <a href="#login"> </a>*/}
                        </Navbar.Text>
                    </Navbar.Collapse>

                </Navbar>


                <div>
                    <Navbar style={{backgroundColor: "lightgray", marginLeft: 40, marginRight: 40}}
                            className={"justify-content-between"}>
                        <Navbar.Brand href="instructor_home"> </Navbar.Brand>

                        <Nav>
                            <Image onClick={this.setRedirectAcct} className={"config_image"}
                                   src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                        </Nav>

                    </Navbar>
                </div>

                <div>
                    {labs.map(lab => (
                        <div style={{
                            textAlign: "left", marginLeft: 40, marginRight: 40, marginTop: 10,
                            borderStyle: "dashed", borderWidth: 1
                        }}>
                            <h4>{lab.name}</h4>
                            {"Author: " + lab.author}
                            <br/>
                            {"Description: " + lab.description}
                            <br/>
                            {"Keywords: " + lab.keywords}
                        </div>


                    ))}

                </div>

            </div>


        )
    }
}

export default public_labs;