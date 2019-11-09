import React, {Component} from 'react';
import icon from "../Images/v.jpg";

import '../stylesheets/banner.css';
import '../stylesheets/student_lab.css';
import '../stylesheets/create_lab.css';
import {Button, Col, Container, FormGroup, Image, Nav, Navbar, Row,InputGroup,FormControl,Card} from "react-bootstrap";
import Redirect from "react-router-dom/es/Redirect";
import {Link} from "react-router-dom";
import {Instruction} from "./instruction";
import {Workspace} from "./Droppable_space";
import {Slides} from "./Slides";

import {EquipmentList} from "./EquipmentList";



class create_lab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectHome: false,
            // selectEquipment: false,
            // doSetup:false,
            restart:false,
            instruction:""

        };
    }
    setRedirectHome = () => {
        this.setState({
            redirectHome: true
        })
    }
    // clickSelectEquipment = () => {
    //     this.setState({
    //         selectEquipment: true
    //     })
    // }
    // finishSelectEquipment = () => {
    //     this.setState({
    //         selectEquipment: false
    //     })
    // }
    // clickSetup = () => {
    //     this.setState({
    //         doSetup: true
    //     })
    // }
    // finishSetup = () => {
    //     this.setState({
    //         doSetup: false
    //     })
    // }
    // ifSelectingEquipment()
    // {
    //     return this.state.selectEquipment && !this.state.doSetup
    // }
    // ifSettingup()
    // {
    //     return this.state.doSetup && !this.state.selectEquipment
    // }

    setRestart = () => {
        this.setState({
            restart: true,      //should probably just be restarting a single step
            // selectEquipment:false,
            // doSetup:false
        })
    }


    banner() {
        return (
            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )

    }
    tab()
    {
        return(
            <label className="tab"  >Create Lab</label>
        )

    }

    slides()
    {
        return(
            <div>
                <Slides/>
            </div>
            )
    }
    handleFieldChange = (e, field) => {
        this.setState({ [field]: e.target.value });
    };
    instructions()
    {
        return(
            <div style={{padding: 10,width: '20rem',height:'30vh'}}>

                <textarea
                    style={{resize:"none",height:"100%",width:"100%",borderStyle:"solid",borderWidth:1,color:"black"}}
                    placeholder="Input instruction for this step here"
                    onChange={(e) => this.handleFieldChange(e, 'instruction')}
                    value={this.state.instruction}
                />

            </div>

        )
    }

    options()
    {

            return(
                <div>

                    <EquipmentList/>
                    {/*<Instruction/>*/}
                    {this.instructions()}
                </div>

            )

    }
    toolbar()
    {
     //   if(this.ifSelectingEquipment())
        {
            return (
                <Navbar style={{marginLeft: 40, marginRight: 40, marginTop: 10, marginBottom: 10}}
                        className={"justify-content-between bar"}>
                    <Nav>

                        <Link to="/create_lab">
                            <Button onClick={this.setRestart} style={{backgroundColor: "black"}}>Restart</Button>
                        </Link>
                        {/*<Image onClick={this.finishSelectEquipment} className={"buttons"} src={"https://icon-library.net/images/finished-icon/finished-icon-21.jpg"} />*/}

                        <Image className={"buttons"} src={"https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png"} />

                        </Nav>

                    <Nav>
                        <Image className={"save_image"}
                               src="https://cdn2.iconfinder.com/data/icons/web-application-icons-part-2/100/Artboard_73-512.png"
                               rounded/>

                        <Link to="/instructor_home">
                            <Image onClick={this.setRedirectHome} className={"config_image"}
                                   src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/exit-512.png"
                                   rounded/>
                        </Link>
                    </Nav>

                </Navbar>
            )
        }
        /*else {
            return (
                <Navbar style={{marginLeft: 40, marginRight: 40, marginTop: 10, marginBottom: 10}}
                        className={"justify-content-between bar"}>
                    <Nav>

                        <Link to="/create_lab">
                            <Button onClick={this.setRestart} style={{backgroundColor: "black"}}>Restart</Button>
                        </Link>
                    </Nav>

                    <Nav>
                        <Image className={"save_image"}
                               src="https://cdn2.iconfinder.com/data/icons/web-application-icons-part-2/100/Artboard_73-512.png"
                               rounded/>

                        <Link to="/instructor_home">
                            <Image onClick={this.setRedirectHome} className={"config_image"}
                                   src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/exit-512.png"
                                   rounded/>
                        </Link>
                    </Nav>

                </Navbar>
            )
        }*/
    }
    render(){

        return(
            <div >

                {this.banner()}
                {/*<div style={{display:"flex"}}>*/}
                {/*    {this.tab()}*/}
                {this.toolbar()}
                <Container fluid className={"contain"} style={{cursor: 'initial'}}>
                    <Row >
                        <Col style={{justifyContent:'center',alignItems:"center",height: '80vh',overflowY:"scroll",backgroundColor:"#65bc93"}}  lg={{span:1}} className={"darkerBack"}>
                            {this.slides()}
                        </Col>

                        <Col style={{justifyContent:'center',alignItems:"center",height: '80vh',backgroundColor:"#50c8cf"}}  lg={{span:3}} >
                            {/*<Instruction/>*/}
                            {this.options()}
                        </Col>
                        <Col lg={{span:8}} className="darkerBack" >
                            <Workspace empty={true}/>



                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }


}


export default create_lab;