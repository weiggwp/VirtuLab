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
import EquipmentSet from "../EquipmentSet.js";

import axios from "axios";
import GLOBALS from "../Globals";
import Draggable from 'react-draggable';
import {Equipment} from "./Equipment";
import {Draggable_equipment} from "./Draggable_equipment";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Element from "../Element";
import water from "../Images/water.svg";
import Tool from "../Tool";
import Glassware from "../Glassware";
import small_volFlask from "../Images/100mLVolumetricFlask.svg";


class create_lab extends React.Component {
    constructor(props) {
        super(props);
        this.equipmentSet=new EquipmentSet();;

        this.state = {
            redirectHome: false,
            restart:false,
            steps : [new Step(0)],
            // steps: [],
            step_num: 0,
            lab_id:0,
            lab_loaded:false,
            lab_title:"Untitled Lab",
            equipments:{0:[]}


        };
        this.handleAddEquipment = this.handleAddEquipment.bind(this);
    }
    populateEquipmentSetup()
    {
        var equipList = this.props.location.state.equipments;
        if (equipList !== undefined)//opening a previously saved lab
        {
            var result ={
                'Solution': [],
                'Tools': [],
                'Glassware': {},

            };
            for (var i = 0; i < equipList.length; i++) {
                var current = equipList[i];
                if(current.disabled)
                    console.log(current.name+" is disabled");
                if(current.type==="Solution")
                {
                    var equip = new Element(current.name, current.image, current.capacity);
                    equip.setDisabled(current.disabled)
                    result['Solution'].push(equip)
                }
                else if(current.type==='Tools')
                {
                    var equip =new Tool(current.name, current.image);
                    equip.setDisabled(current.disabled)
                    result['Tools'].push(equip);
                }
                else {
                    if(result['Glassware'][current.type]===undefined)
                        result['Glassware'][current.type]=[]

                    var equip = new Glassware(current.name, current.image, current.capacity);
                    equip.setDisabled(current.disabled)
                    equip.setType(current.type)
                    result['Glassware'][current.type].push(equip);
                }


            }
            console.log("current equipment set",this.equipmentSet)
            console.log("setting to new equipment set",result)
            this.equipmentSet.setEquipmentList(result);

        }
    }

    populateSteps()
    {
        if(this.props.location.state!==undefined)
        {


            var step_list = this.props.location.state.steps;

            if (step_list !== undefined)//opening a previously saved lab
            {
                for (var i = 1; i < step_list.length; i++) {
                    this.state.steps.push(new Step(i, step_list[i].instruction));
                    this.state.equipments[i]=[];

                }

            }
            this.populateEquipmentSetup();

            // alert("got here"+this.props.location.state.id);

            this.setState(
                {
                    step_num: step_list.length - 1,
                    lab_id: this.props.location.state.id,
                    lab_title:this.props.location.state.name,
                    lab_loaded: true,
                }, () => {
                    console.log(this.state.lab_id);
                    console.log(this.state.lab_title);
                    console.log(this.state.steps);
                }
            )

        }
        else
        {


            this.setState(
                {

                    lab_loaded: true,
                }, () => {

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
            equipments:{}
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
            labID: this.state.lab_id,
            //if zero, it's not a valid labID

            name: this.state.lab_title,
            creator: this.props.email,
            steps: this.state.steps,
            equipments: this.equipmentSet.getJSONList(),
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
                                       }

                                       }
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


                        <Link to="/instructor_labs">
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
        //,width: '20rem' for div
        return(
            <div style={{padding: 10,height:'30vh'}}>

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

                <Card style={{ height:'30vh'}}>
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
        //the zeroth get a different handler - enable disable
        //TODO: initial step equipment setup for future equipment set
        instructions.push(<Tab.Pane eventKey={0}>
            <EquipmentList step={0} set={this.equipmentSet.getEquipments()} handleAddEquipment={this.handleAddEquipment}/>

            {this.setupInstruction(0,"This is the setup stage. " +
            "Click on equipments you would like to be available for the duration of the lab (click again to unselect)") }</Tab.Pane>);

        for (let i = 1; i <= this.state.step_num; i += 1) {
            // instructions.push(<Tab.Pane eventKey={i}> {this.state.steps[i].instruction} </Tab.Pane>);
            instructions.push(<Tab.Pane eventKey={i}>
                <EquipmentList set={this.equipmentSet.getEquipments()} step={i} handleAddEquipment={this.handleAddEquipment}/>

                instruction for step {i} {this.instruction(i)}</Tab.Pane>);
            }


        return(
            <Tab.Content>

                {instructions}
            </Tab.Content>
        )

    }
    onDragOver=()=>{
        alert("dragging over")
    }


    workspacePane(){
        const workspaces = [];



        // workspaces.push(<Tab.Pane eventKey={0}> {this.state.steps[0].workspace} </Tab.Pane>);
        workspaces.push(<Tab.Pane eventKey={0}> workspace for step {0} </Tab.Pane>);

        for (let i = 1; i <= this.state.step_num; i += 1) {
            const equipments = this.state.equipments[i];
            // workspaces.push(<Tab.Pane eventKey={i}> {this.state.steps[i].workspace} </Tab.Pane>);
            workspaces.push(<Tab.Pane eventKey={i} style={{height:"100%"}}>
                workspace for step {i}
                <div style={{height:"100%"}}>

                    {equipments.map((equipment,index) => (

                        <Draggable_equipment image ={equipment} x={index*100} y={index*100} width={200} height={200}/>
                        // <Draggable_equipment x={500} y={100} width={100} height={100}/>
                        // <Draggable_equipment x={400} y={100} width={200} height={200}/>

                    ))
                    }

                    <ToastsContainer store={ToastsStore}/>
                </div>
            </Tab.Pane>);
        }

        return(
            <Tab.Content style={{height:"100%"}}>
                {workspaces}
            </Tab.Content>
        )
    }

    handleAddChild = () => {
        this.state.steps.push(new Step(this.state.steps.length,""));
        var temp = this.state.equipments;

        //right now temp is filled with image sources of equipments
        temp[this.state.step_num+1]=temp[this.state.step_num].slice();
        this.setState({
            //add a new step to steps[]
            step_num: this.state.step_num + 1,
            equipments:temp


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
    handleSelectEquipment=(equipment)=>
    {
        equipment.disabled = !equipment.disabled;
        alert(equipment.name+" "+equipment.disabled)


    }
    handleAddEquipment= (step,equipment) =>
    {
        if(step===0)
        {
            this.forceUpdate()
            return
        }

        var image = equipment.image;

        const current = this.state.equipments;
        if(current[step].length>=10)
        {
            ToastsStore.error("Workspace full! Only ten equipments allowed")
        }
        else
        {
            current[step].push(image);
            //            <Draggable_equipment image={image} x={500} y={100} width={this.state.equipments.length*100} height={this.state.equipments.length*100}/>



            this.setState(
                {
                    equipments:current
                }, () => {
                    console.log(this.state.equipments)
                }
            )
        }



    }


    render(){

        if(!this.state.lab_loaded)
        {
            this.populateSteps();
            return null;
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

                        <Col lg={{span:7}} className="darkerBack"  >
                            {this.workspacePane()}


                        </Col>

                    </Row>
                </Tab.Container>
            </div>
        )
    }


}


export default create_lab;