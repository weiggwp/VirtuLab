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
class do_lab extends React.Component {
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


export default do_lab;