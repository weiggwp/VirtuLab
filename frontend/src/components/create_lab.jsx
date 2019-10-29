import React, {Component} from 'react';
import icon from "../Images/v.jpg";
import '../stylesheets/banner.css';
import '../stylesheets/student_lab.css';
import '../stylesheets/create_lab.css';
import {Button, Col, Container, FormControl, FormGroup, Image, Jumbotron, Nav, Navbar, Row} from "react-bootstrap";
import Redirect from "react-router-dom/es/Redirect";
import {Link} from "react-router-dom";
import {Instruction} from "./instruction";
import {Workspace} from "./Droppable_space";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Equipment} from "./Equipment";

class create_lab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectHome: false,
            selectEquipment: false,
            doSetup:false,
            restart:false

        };
    }
    setRedirectHome = () => {
        this.setState({
            redirectHome: true
        })
    }
    clickSelectEquipment = () => {
        this.setState({
            selectEquipment: true
        })
    }
    finishSelectEquipment = () => {
        this.setState({
            selectEquipment: false
        })
    }
    clickSetup = () => {
        this.setState({
            doSetup: true
        })
    }
    finishSetup = () => {
        this.setState({
            doSetup: false
        })
    }
    ifSelectingEquipment()
    {
        return this.state.selectEquipment && !this.state.doSetup
    }
    ifSettingup()
    {
        return this.state.doSetup && !this.state.selectEquipment
    }

    setRestart = () => {
        this.setState({
            restart: true,
            selectEquipment:false,
            doSetup:false
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

    options()
    {
        if(!this.ifSelectingEquipment() && !this.ifSettingup())
        {
            //two buttons
            return(
            <div style={{ paddingTop:170,paddingLeft:3}}>
                <Button onClick={this.clickSelectEquipment} style={{ backgroundColor: 'orange',color:"white",height:"10vh"}} block bsSize="large" >
                    Select Equipment
                </Button>
                <Button onClick={this.clickSetup} style={{ backgroundColor: 'orange',color:"white",height:"10vh"}} block bsSize="large" >
                    Finish Setup
                </Button>
            </div>
            )
        }
        if(this.ifSelectingEquipment())
        {
            return(
                <Tabs style={{ borderStyle:"solid",borderWidth:1,marginTop:10,backgroundColor: '#96E2FA',color:"white",height:"8vh"}} defaultActiveKey="Solutions" transition={false} id="noanim-tab-example">
                    <Tab eventKey="Solutions" title="Solutions" >
                        <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>
                            <Button style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                                <Equipment image={"https://cdn.iconscout.com/icon/premium/png-256-thumb/water-bottle-1738496-1475816.png"}/>
                                Distilled water

                            </Button>


                        </ButtonGroup>
                    </Tab>
                    <Tab eventKey="Glassware" title="Glassware" >
                        <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>
                        <Button style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                            <Equipment image={"https://cdn4.iconfinder.com/data/icons/medical-health-10/128/1-512.png"}/>
                            Erlenmeyer flask

                        </Button>
                        <Button style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                            <Equipment image={"https://cdn4.iconfinder.com/data/icons/laboratory-4/58/9-512.png"}/>
                            Beaker

                        </Button>
                        </ButtonGroup>

                    </Tab>
                    <Tab eventKey="Tools" title="Tools" >
                        {/*<Sonnet />*/}
                    </Tab>
                </Tabs>
            )

        }
        if(this.ifSettingup())
        {
            return(
                <Instruction/>
            )

        }
    }
    toolbar()
    {
        if(this.ifSelectingEquipment())
        {
            return (
                <Navbar style={{marginLeft: 40, marginRight: 40, marginTop: 10, marginBottom: 10}}
                        className={"justify-content-between bar"}>
                    <Nav>

                        <Link to="/create_lab">
                            <Button onClick={this.setRestart} style={{backgroundColor: "black"}}>Restart</Button>
                        </Link>
                        <Image onClick={this.finishSelectEquipment} className={"buttons"} src={"https://icon-library.net/images/finished-icon/finished-icon-21.jpg"} />

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
        else {
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
        }
    }
    render(){

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