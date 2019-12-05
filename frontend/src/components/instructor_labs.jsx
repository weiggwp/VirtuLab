import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

import axios from 'axios';
import '../stylesheets/Login.css';
import '../stylesheets/banner.css';
import '../stylesheets/student_home.css';
import icon from '../Images/v.jpg';
import {Button, Image, Navbar, NavItem, InputGroup, Nav, Tooltip, OverlayTrigger} from 'react-bootstrap';


import image from '../Images/lab_promo.png'
import login from "./login";
import {Droppable_course} from "./droppable_course";
import {Expandable_Classes} from "./expandable_course";
import InstructorHeader from "./instructorHeader";
import GLOBALS from "../Globals";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import {Course} from "./Course";
import Accordion from "react-bootstrap/Accordion";

class labOjb {
    constructor(id, name, author, keywords, description, courses) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.keywords = keywords;
        this.description = description;
        this.courses = courses;
    }

}
class instructor_labs extends React.Component {
    constructor(props) {
        super(props);
        this.redirectEdit={
            id:0,
            name:'',
            steps:[],
            equipments:[]
        }
        this.state = {
            user: this.props.user,
            inCoursePage: true,
            redirectAcct: false,
            redirectCourse: false,
            redirectLab: false,
            redirectPublish:false,
            redirectAssign:false,
            classes:[],
            labs:[],
            loading_labs:true,
            edit_lab:false,
            publish_lab:false,



        };
    }

    publishMessage(lab){

        if (lab.open==1 ){
            return "Un-publish";
        }
        return "Publish";
    }

    handleCloneLab(lab){

        console.log(" lab is " +JSON.stringify(lab))

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };

        lab.creator=this.props.email;
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'clone_lab', lab, axiosConfig)
            .then((response) => {
                this.render();
                window.location.reload()

            })
            .catch((error) => {
                    console.log("doot" + error)
                }
            );
    }


    updateClasses(){
        const user = {
            email: this.props.email
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        var classArr=[];
        var classArray=[];

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_courses', user, axiosConfig)
            .then((response) => {

                console.log(JSON.stringify(response))


                for (let i=0; i<response.data.length; i++){
                    classArr[i]=response.data[i]

                }
                var classArray=[];

                for (let i=0; i<response.data.length; i++){
                    classArray[i]={classname:response.data[i].courseName,classID:0,
                        clicked:false,labs:response.data[i].labs,accessCode:response.data[i].accessCode};

                    //    console.log("class array[i] is " +classArray[i].classname+ " id is " + classArray[i].accessCode)
                }
                this.setState({classes:classArray,loading_course:false});
            })
            .catch((error) => {
                    console.log("doot" + error)
                }
            );
    }
    setRedirectAcct = () => {
        this.setState({
            redirectAcct: true
        })
    };
    handlePublic = ()=>{
     //   alert("yeet")
        this.setState({
            redirectLabPublic: true
        })
    }

    handleAssignLab(lab){
        this.setState({redirectAssign:true});
        this.redirectPublish = {
            id: lab.labID,

        }
    }


    handleDeleteLab(lab) {

        let labToDel = {
            email: this.props.email,
            labID: lab.labID
        }

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'del_lab', labToDel, axiosConfig)
            .then((response) => {
                //  console.log("success!")
                this.render()
                window.location.reload()
            })
            .catch((error) => {
                    //  console.log("doot" + error)
                }
            );
    }



    handleAssignLab(lab){
        this.setState({redirectAssign:true});
        this.redirectPublish = {
            id: lab.labID,

        }
    }


    handleCreateLab = () => {
        this.setState({
            redirectLabCreation: true
        })
    };
    handleEditLab(lab)
    {


        this.redirectEdit={
            id:lab.labID,
            name:lab.name,
            steps:lab.steps,
            equipments:lab.equipments



        }
        // alert("lab id"+this.redirectEdit.id+" name: "+this.redirectEdit.name+" ");

        this.setState({
            edit_lab:true
        })
    }
    handlePublishLab(lab) {
        if (lab.open==1) {
            const labpub = {
                labID: lab.labID,
                author:this.props.email
            };

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",

                }
            };


            //axio sends message to backend to handle authentication
            // 'aws_website:8080/userPost'
            axios.post(GLOBALS.BASE_URL + 'publish_lab', labpub, axiosConfig)
                .then((response) => {
                  //  console.log("success!")
                    this.render()
                    window.location.reload()
                })
                .catch((error) => {
                      //  console.log("doot" + error)
                    }
                );
        } else {
            this.redirectPublish = {
                id: lab.labID,

            }
            this.setState({
                publish_lab: true
            })
        }
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
        else if (this.state.redirectAssign){
            return <Redirect exact to={{
                pathname: '/assign_lab',
                state: {
                    id:this.redirectPublish.id,
                    courses:this.state.classes
                },
            }}/>;
        }
        else if (this.state.redirectLabCreation){
            return <Redirect exact to={{
                pathname: '/create_lab',
            }}/>;
        }
        else if (this.state.redirectLabPublic){
            return <Redirect exact to={{
                pathname: '/public_labs',
            }}/>;
        }
        else if (this.state.redirectPublish){
            return <Redirect exact to={{
                pathname: '/publish_lab',
            }}/>;
        }

    };
    setRedirectLab = () => {
        this.setState({
            redirectLab: true
        })
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(GLOBALS.BASE_URL + 'get_labs', axiosConfig)
            .then((response) => {


            })
    };
    updateLabs(){
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
        var labs=[];

        //axio sends message to backend to handle authentication
        axios.post(GLOBALS.BASE_URL + 'get_labs',user
        )
            .then((response) => {
                console.log(response.data);
                for (let i=0; i<response.data.length; i++){
                    labs[i]=response.data[i]
                    console.log("lab " + i + " is " +JSON.stringify(labs[i]))
                }

                this.setState({labs:labs,loading_labs:false});
            })
            .catch((error) => {
                console.log("error retrieving labs");
                }
            );
    }

    render() {
        let labs = this.state.labs;
        let classes=this.state.classes;
        if (this.state.loading_labs){
            this.updateClasses()
            this.updateLabs();
            return null;


        }
        if (this.state.edit_lab){

            return <Redirect exact to={{
                pathname: "/create_lab",
                state: {
                    id:this.redirectEdit.id,
                    name:this.redirectEdit.name,
                    steps:this.redirectEdit.steps,
                    equipments:this.redirectEdit.equipments
                },
            }}/>;


        }
        if (this.state.publish_lab){
            return <Redirect exact to={{
                pathname: "/publish_lab",
                state: {
                    id:this.redirectPublish.id,

                },
            }}/>;

        }
        else {
            console.log("redpubl is " +this.state.redirectPublish)
            return (
                <div>
                    {this.renderRedirect()}
                    <InstructorHeader currentTab="Labs"/>
                    <Navbar>
                        <Navbar.Brand href="#instructor_home">Welcome!</Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Instructor: {this.props.name}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>


                    <div>
                        <div>
                            <Navbar style={{backgroundColor: "lightgray", marginLeft: 40, marginRight: 40}}
                                    className={"justify-content-between"}>
                                <Nav>
                                    <Button onClick={this.handleCreateLab} style={{backgroundColor: "#e88f65ff"}}
                                            variant="primary">Create Lab</Button>
                                </Nav>

                                <Nav>
                                    <Button onClick={this.handlePublic} style={{backgroundColor: "#e88f65ff"}}
                                            variant="primary">View Public Labs</Button>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Account Setting
                                            </Tooltip>
                                        }
                                    >
                                        <Link to="/account_settings">
                                            <Image className={"config_image"}
                                                   src="https://icon-library.net/images/config-icon/config-icon-21.jpg"
                                                   rounded/>
                                        </Link>

                                    </OverlayTrigger>
                                </Nav>
                            </Navbar>
                        </div>
                        <div>
                            {labs.map(lab => (
                                <div style={{
                                    textAlign: "left", marginLeft: 40, marginRight: 40, marginTop: 10,
                                    borderStyle: "dashed", borderWidth: 1
                                }}>
                                    <ButtonGroup style={{width: "100%",color:"red"}}>


                                        <Dropdown as={ButtonGroup} style={{width: "100%"}}
                                                  class={"dropdown-menu-right dropdown-button-drop-right"}>
                                            {/*    <Button variant="info" style={{width:"90%"}} style={{textAlign:"left"}}disabled>*/}
                                            {/*        <div >*/}
                                            {/*        {lab.name}     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>*/}
                                            {/*        /!*{"Author: " + lab.author}*!/*/}
                                            {/*        /!*<br/>*!/*/}
                                            {/*        /!*{"Description: " + lab.description}*!/*/}
                                            {/*        /!*<br/>*!/*/}
                                            {/*        /!*{"Keywords: " + lab.keywords}*!/*/}
                                            {/*        </div>*/}
                                            {/*    </Button>*/}

                                            <Dropdown.Toggle style={{textAlign: "left",}} variant="info">
                                                {lab.name}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu class="dropdown-menu">
                                                <Dropdown.Item class={"dropdown-item"} eventKey="1">View</Dropdown.Item>

                                                <Dropdown.Item onClick=
                                                                   {() => this.handleEditLab(lab)} class={"dropdown-item"} eventKey="2">Edit</Dropdown.Item>


                                                <Dropdown.Item onClick=
                                                                   {() => this.handleCloneLab(lab)} class={"dropdown-item"} eventKey="3">Clone</Dropdown.Item>

                                                <Dropdown.Item onClick=
                                                                   {() => this.handlePublishLab(lab)}class={"dropdown-item"}

                                                               eventKey="4">{this.publishMessage(lab)}</Dropdown.Item>
                                                <Dropdown.Item class={"dropdown-item"}
                                                               onClick = {() => this.handleDeleteLab(lab)}
                                                               eventKey="5">Delete</Dropdown.Item>



                                          {/*      <Dropdown class={"dropdown-item"}
                                                               eventKey="5">Assign {classes.map(classItem => (

                                                    <Dropdown.Item class={"dropdown-item"} onClick=
                                                        {() => this.handleAddClass(classItem.accessCode,lab)} eventKey="8">{classItem.classname}</Dropdown.Item>



                                                ))}

                                                </Dropdown>*/}



                                                <Dropdown.Item onClick=
                                                                   {() => this.handleAssignLab(lab)}class={"dropdown-item"}
                                                               eventKey="6">Assign</Dropdown.Item>


                                                {/*<Dropdown.Divider />*/}

                                            </Dropdown.Menu>
                                        </Dropdown>


                                    </ButtonGroup>


                                </div>


                            ))}

                        </div>
                        {/*{<Expandable_Classes style={"settingsH3"}/>}*/}


                    </div>
                </div>


            )
        }
    }
}

export default instructor_labs;