import React, {Component} from 'react';
import icon from "../Images/v.jpg";
import '../stylesheets/banner.css';
import '../stylesheets/student_lab.css';
import {Button, Col, Container, FormControl, FormGroup, Image, Jumbotron, Nav, Navbar, Row} from "react-bootstrap";
import Redirect from "react-router-dom/es/Redirect";
import {Link} from "react-router-dom";
import {Instruction} from "./instruction";
import {Workspace} from "./Droppable_space";
import StudentHeader from './studentHeader.jsx';
import {EquipmentList} from "./EquipmentList";
import axios from "axios";
import GLOBALS from "../Globals";
class dolab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectHome: false,
            restart:false

        };
    }
    setRedirectHome = () => {

        this.setState({
            redirectHome: true
        })
    }
    completeLab(){

        console.log("props is "+JSON.stringify(this.props))
        const lab = {
            labID:this.props.location.state.labID,
        }
        let labs =[];
        labs[0]=lab;
        const courselab= {
            labs:labs,
            email: this.props.email,
            code:this.props.location.state.courseID,

        };
        alert("courselab is "+JSON.stringify(courselab))
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        axios.post(GLOBALS.BASE_URL + 'set_completion', courselab, axiosConfig)
            .then((response) => {
                console.log("success!")

            })
            .catch((error) => {
                    alert("doot" + error)

                }
            );
    }
    setRestart = () => {
        this.setState({
            restart: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirectHome) {
            return <Redirect to='/student_home' />
        }
        if(this.state.restart)
        {
            return <Redirect to='/do_lab'/>
        }
        // else if(this.state.redirectCourse){
        //     return <Redirect to='/add_course' />
        // }
        // else
        // {
        //     return <Redirect to='/do_lab' />
        // }
    }

    banner() {
        return (
            <StudentHeader/>
      )

    }
    tab()
    {
        return(
            <label className="tab"  >Lab workspace</label>
        )

    }

    toolbar()
    {
        return (
            <Navbar style={{ marginLeft:40,marginRight:40,marginTop:10,marginBottom:10}}  className={"justify-content-between bar"}>
                <Nav >

                    <Link to="/do_lab">
                        <Button  onClick={this.setRestart} style={{backgroundColor:"black"}} >Restart</Button>
                    </Link>
                </Nav>

                <Nav >
                    <Link to="/student_home">
                        <Image  onClick={this.setRedirectHome} className={"config_image"} src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/exit-512.png" rounded />

                    </Link>
                </Nav>

            </Navbar>
        )
    }
    render(){
        this.renderRedirect();
        this.completeLab()
        return(
            <div >

                {this.banner()}
                {/*<div style={{display:"flex"}}>*/}
                {/*    {this.tab()}*/}
                    {this.toolbar()}
                {/*</div>*/}
                <Container fluid className={"contain"} style={{cursor: 'initial'}}>
                    <Row >
                        <Col style={{justifyContent:'center',alignItems:"center",height: '80vh'}}  lg={{span:3}} className={"backcolor"}>

                            <EquipmentList/>
                            <Instruction/>


                        </Col>
                        <Col lg={{span:8}} className="darkerBack" >
                            <Workspace />



                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }


}


export default dolab;