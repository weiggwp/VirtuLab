import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


// import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import icon from '../Images/v.jpg';
import {Button, Image,Navbar,NavItem,InputGroup,Nav } from 'react-bootstrap';


import image from '../Images/lab_promo.png'
import login from "./login";
import {Droppable_course} from "./droppable_course";
import {Expandable_Classes} from "./expandable_course";


class student_home extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            redirectAcct: false,
            redirectCourse: false,
            redirectLab :false,


            collapseID: "collapse3"


        };
    }
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
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
            return <Redirect to='/account_settings' />
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


    render() {
        return(

            <div>
                {this.renderRedirect()}
                <div className="banner">

                    <img src={icon} alt="icon" width="30px" height="30px"/>
                    <label >VirtuLab</label>
                </div>
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


                                <Button  style={{backgroundColor:"#e88f65ff"}} variant="primary">Add Course</Button>

                        </Nav>

                        <Nav >
                            <label className="contain">
                                Show Completed Labs
                                <input type="checkbox"/>
                                <span className="checkmark">

                                    </span>
                            </label>

                            <Image  onClick={this.setRedirectAcct} className={"config_image"} src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded />

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