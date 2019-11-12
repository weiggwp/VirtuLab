import React, {Component} from 'react';
import icon from "../Images/v.jpg";

import '../stylesheets/banner.css';
import '../stylesheets/student_lab.css';
import '../stylesheets/create_lab.css';
import {Tab,Button, Col, Container, FormGroup, Image, Nav, Navbar, Row,InputGroup,FormControl,Card} from "react-bootstrap";
import Redirect from "react-router-dom/es/Redirect";
import {Link} from "react-router-dom";
import {Instruction} from "./instruction";
import {Workspace} from "./Droppable_space";
import Step from "../Step.js";
import {Slides} from "./Slides";
import EditableLabel from 'react-editable-label';
import {EquipmentList} from "./EquipmentList";
import axios from "axios";
import GLOBALS from "../Globals";


class create_lab extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            redirectHome: false,
            restart:false,
            steps : [new Step(0)],
            // steps: [],
            step_num: 0,
            lab_id:0,
            lab_loaded:false,
            lab_title:"Untitled Lab"


        };
    }
    setRedirectProps()
    {


    }
    populateSteps()
    {
        if(this.props.location.state!==undefined)
        {
            alert(this.props.location.state);


            var step_list = this.props.location.state.steps;

            if (step_list !== undefined)//opening a previously saved lab
            {
                for (var i = 1; i < step_list.length; i++) {
                    this.state.steps.push(new Step(i, step_list[i].instruction));

                }

            }
            console.log(step_list);
            alert("got here"+this.props.location.state.id);

            this.setState(
                {
                    step_num: step_list.length - 1,
                    lab_id: this.props.location.state.id,
                    lab_loaded: true,
                }, () => {
                    alert(this.state.lab_id);
                }
            )
        }
    }
    setRedirectHome = () => {
        this.setState({
            redirectHome: true
        })
    };

    setRestart = () => {
        this.setState({
            restart: true,      //should probably just be restarting a single step
            // selectEquipment:false,
            // doSetup:false
        })
    };


    banner() {
        return (
            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )

    }
    getStepsArray()
    {
        var array = [];
        var current = this.state.steps;
        while(current)
        {
            array.push({
                index:current.index,
                stepNum:current.instruction
            })
            current = current.next;
        }
        return array;


    }

    handleLabSave = (e) => {
        // e.preventDefault();
        const lab = {

            name: this.state.lab_title,
            creator: this.props.email,
            steps: this.state.steps,
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(GLOBALS.BASE_URL + 'save_lab', lab, axiosConfig)
            .then((response) => {
                this.setState({save_success: true});
                console.log("id is "+response.data);
                if(this.state.lab_id===0)  //only if not set

                    this.setState({lab_id:response.data});

                console.log("response: ", response);
            })
            .catch((error) => {
                    this.setState({
                        errors: 'Saving error',
                    });
                }
            );
    };

    toolbar()
    {
        //   if(this.ifSelectingEquipment())
        {
            return (
                <Navbar style={{marginLeft: 40, marginRight: 40, marginTop: 10, marginBottom: 10}}
                        className={"justify-content-between bar"}>
                    <Nav>
                        <EditableLabel labelClass="lab_title_label" inputClass="lab_title_input"
                                       initialValue={this.state.lab_title}
                                       save={value => {
                                           this.setState({lab_title:value});
                                       }}
                        />


                    </Nav>

                    <Nav>
                        <Link to="/create_lab">
                            <Button onClick={this.setRestart} style={{backgroundColor: "black"}}>Restart</Button>
                        </Link>
                        {/*<Image onClick={this.finishSelectEquipment} className={"buttons"} src={"https://icon-library.net/images/finished-icon/finished-icon-21.jpg"} />*/}

                        <Image className={"buttons"} src={"https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png"} />
                        <Image className={"save_image"} onClick={this.handleLabSave}
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

    handleFieldChange = (e, field) => {
        this.setState({ [field]: e.target.value });
    };
    handleInstructionChange=(e,index)=>
    {
        var list = this.state.steps;
        list[index].setInstruction(e.target.value);
        this.setState({
            steps:list
        })
        console.log(this.state.steps);
    };

    instruction(index)
    {
        return(
            <div style={{padding: 10,width: '20rem',height:'30vh'}}>

                <textarea
                    style={{resize:"none",height:"100%",width:"100%",borderStyle:"solid",borderWidth:1,color:"black"}}
                    placeholder="Input instruction for this step here"
                    onChange={(e) => this.handleInstructionChange(e, index)}
                    value={this.state.steps[index].instruction}
                />

            </div>

        )
    }
    setupInstruction(step,text)
    {
        return(
            <div style={{ paddingTop:10,paddingLeft:3}}>

                <Card style={{ width: '20rem',height:'30vh'}}>
                    <Card.Header>STEP {step}:</Card.Header>
                    <Card.Body style={{overflowY: "scroll",height:"3vh"}}>
                        <Card.Text style={{textAlign:"left"}}>
                            {text}
                        </Card.Text>
                    </Card.Body>
                </Card>
                {/*<div style={{ paddingTop:20,paddingLeft:3}}>*/}
                {/*    <Button style={{ backgroundColor: 'transparent',color:"black"}} block bsSize="large" >*/}
                {/*        Finish*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>

        );
    }


    instructionPane()
    {
        const instructions = [];
        // instructions.push(<Tab.Pane eventKey={0}> {this.state.steps[0].instruction} </Tab.Pane>);
        instructions.push(<Tab.Pane eventKey={0}>  {this.setupInstruction(0,"This is the setup stage. " +
            "Click on equipments you would like to be available for the duration of the lab (click again to unselect)") }</Tab.Pane>);

        for (let i = 1; i <= this.state.step_num; i += 1) {
            // instructions.push(<Tab.Pane eventKey={i}> {this.state.steps[i].instruction} </Tab.Pane>);
            instructions.push(<Tab.Pane eventKey={i}>instruction for step {i} {this.instruction(i)}</Tab.Pane>);
            }

        return(
            <Tab.Content>
                <EquipmentList/>
                {instructions}
            </Tab.Content>
        )

    }

    workspacePane(){
        const workspaces = [];
        // workspaces.push(<Tab.Pane eventKey={0}> {this.state.steps[0].workspace} </Tab.Pane>);
        workspaces.push(<Tab.Pane eventKey={0}> workspace for step {0} </Tab.Pane>);

        for (let i = 1; i <= this.state.step_num; i += 1) {
            // workspaces.push(<Tab.Pane eventKey={i}> {this.state.steps[i].workspace} </Tab.Pane>);
            workspaces.push(<Tab.Pane eventKey={i}>workspace for step {i} </Tab.Pane>);
        }

        return(
            <Tab.Content>
                {workspaces}
            </Tab.Content>
        )
    }

    handleAddChild = () => {
        this.state.steps.push(new Step(this.state.steps.length,""));
        this.setState({
            //add a new step to steps[]
            step_num: this.state.step_num + 1

        }
        );

    };
    handlInstructionUpdate = () => {
        this.setState({
            //add a new step to steps[]
            step_num: this.state.step_num + 1
        });
        // alert(this.state.step_num);
    };


    render(){
        if(!this.state.lab_loaded)
        {
            this.populateSteps();
        }

        return(
            <div >

                {this.banner()}

                {this.toolbar()}

                <Tab.Container id="steps" defaultActiveKey="0">
                    <Row>
                        <Col style={{marginLeft:"4%",justifyContent:'center',alignItems:"center",height: '80vh',overflowY:"scroll",backgroundColor:"#65bc93"}}  lg={{span:1}} className={"darkerBack"}>
                            {/*{this.slides()}*/}
                            {/*<Slides slide_num={this.state.steps.length} addChild={this.handleAddChild}/>*/}
                            <Slides slide_num={this.state.step_num} addChild={this.handleAddChild}/>
                        </Col>
                        <Col style={{justifyContent:'center',alignItems:"center",height: '80vh',backgroundColor:"#50c8cf"}}  lg={{span:3}} >
                                {this.instructionPane()}
                        </Col>
                        <Col lg={{span:7}} className="darkerBack" >
                            {this.workspacePane()}


                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }


}


export default create_lab;