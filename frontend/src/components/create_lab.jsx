import React, {Component} from 'react';
import icon from "../Images/v.jpg";

import '../stylesheets/banner.css';
import '../stylesheets/student_lab.css';
import '../stylesheets/create_lab.css';
import {
    Tab,
    Button,
    Col,
    Container,
    FormGroup,
    Image,
    Nav,
    Navbar,
    Row,
    InputGroup,
    FormControl,
    Card,
    Overlay, Popover
} from "react-bootstrap";
import Redirect from "react-router-dom/es/Redirect";
import {Link} from "react-router-dom";
import {Instruction} from "./instruction";
// import {Workspace} from "./Droppable_space";
import Step from "../Step.js";
import {Slides} from "./Slides";
import EditableLabel from 'react-editable-label';
import {EquipmentList} from "./EquipmentList";
import axios from "axios";
import GLOBALS from "../Globals";
import Draggable from 'react-draggable';
import {Equipment} from "./Equipment";
import {Draggable_equipment} from "./Draggable_equipment";
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Workspace from "../Workspace"


class create_lab extends React.Component {
    constructor(props) {
        super(props);

        this.steps = [new Step(0)];
        this.target = null;
        this.ref = React.createRef();
        this.state = {
            showPopover: false,
            redirectHome: false,
            restart:false,
            steps : [new Step(0)],
            step_num: 0,
            lab_id:0,
            lab_loaded:false,
            lab_title:"Untitled Lab",
            equipments:[[]],


        };
        this.handleAddEquipment = this.handleAddEquipment.bind(this);
        this.interation_handler = this.interation_handler.bind(this);
        this.handle_equip_delete = this.handle_equip_delete.bind(this);
    }

    populateSteps()
    {
        //if not new lab, load old lab
        if(this.props.location.state!==undefined){

            //get steps from prop
            var step_list = this.props.location.state.steps;

            //opening a previously saved lab
            if (step_list !== undefined)
            {
                for (let i = 1; i < step_list.length; i++) {
                    this.state.steps.push(new Step(i, step_list[i].instruction,step_list[i].workspace));
                }

            }
            else{
                return "Step list is not loaded"
            }

            this.setState(
                {
                    step_num: step_list.length - 1,
                    lab_id: this.props.location.state.id,
                    lab_title:this.props.location.state.name,
                    lab_loaded: true,
                }, () => {
                    // console.log(this.state.lab_id);
                    // console.log(this.state.lab_title);
                    // console.log(this.state.steps);
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

    setRestart = (step_id) => {

        this.setState({
            restart: true,      //should probably just be restarting a single step
            equipments:{},

        });

        this.state.steps[step_id].workspace= new Workspace();
    };


    banner() {
        return (
            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )

    }

    handleLabSave = (e) => {
        // e.preventDefault();
        const lab = {
            labID: this.state.lab_id,
            //if zero, it's not a valid labID

            name: this.state.lab_title,
            creator: this.props.email,
            steps: this.state.steps,
            lastModified: new Date(),
        };

        console.log("lab.lastModified", lab.lastModified);

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(GLOBALS.BASE_URL + 'save_lab', lab, axiosConfig)
            .then((response) => {
                this.setState({save_success: true});
                // console.log("id is "+response.data);
                if(this.state.lab_id===0)  //only if not set
                    this.setState({lab_id:response.data});


                // console.log("response: ", response);
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
        {
            return (
                <Navbar style={{marginLeft: 40, marginRight: 40, marginTop: 10, marginBottom: 10}}
                        className={"justify-content-between bar"}>
                    <Nav>
                        <EditableLabel labelClass="lab_title_label" inputClass="lab_title_input"
                                       initialValue={this.state.lab_title}
                                       save={value => {
                                           this.setState({lab_title:value});}
                                       }
                        />
                    </Nav>

                    <Nav>
                        <Link to="/create_lab">
                            <Button onClick={this.setRestart} style={{backgroundColor: "black"}}>Restart</Button>
                        </Link>

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

    handleInstructionChange=(e,index)=>
    {
        var list = this.state.steps;
        list[index].setInstruction(e.target.value);
        this.setState({
            steps:list
        })
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
            <EquipmentList handleAddEquipment={this.handleAddEquipment}/>

            {this.setupInstruction(0,"This is the setup stage. " +
            "Click on equipments you would like to be available for the duration of the lab (click again to unselect)") }</Tab.Pane>);

        for (let i = 1; i <= this.state.step_num; i += 1) {
            // instructions.push(<Tab.Pane eventKey={i}> {this.state.steps[i].instruction} </Tab.Pane>);
            instructions.push(<Tab.Pane eventKey={i}>
                <EquipmentList step={i} handleAddEquipment={this.handleAddEquipment}/>

                instruction for step {i} {this.instruction(i)}</Tab.Pane>);
            }


        return(
            <Tab.Content>

                {instructions}
            </Tab.Content>
        )

    }

    interation_handler(target, workspace_id1,eq_id1,workspace_id2,eq_id2){
        const eq1 = this.state.equipments[workspace_id1][eq_id1];
        const eq2 = this.state.equipments[workspace_id2][eq_id2];
        this.eq1 = eq1;
        this.target = target;
        this.setState({showPopover:!this.state.showPopover});
    }

    handle_equip_delete(e,data){

        const workspace_id = data.workspace_id;
        const eq_id = parseInt(data.equip_id);

        console.log(data);
        let temp = this.state.equipments;
        // delete temp[workspace_id][eq_id];
        console.log(temp[workspace_id][1]);
        // console.log(temp);

        const removed = temp[workspace_id].splice(eq_id,1);

        this.setState({equipments: temp});
        console.log(removed);
        console.log(temp);
    }



    drop_handler(ev) {
        // ev.preventDefault();
        if (ev.stopPropagation) {
            ev.stopPropagation(); // Stops some browsers from redirecting.
        }
        move_element(ev);

        // ev.target.style.border="";
        // ev.target.style.opacity = '1.0';
        return false;
    }
    dragover_handler(ev) {
        if (ev.preventDefault) {
            ev.preventDefault(); // Necessary. Allows us to drop.
        }
        ev.dataTransfer.dropEffect = "move";
        return false;

    }

    workspacePane(){
        const workspaces = [];

        // workspaces.push(<Tab.Pane eventKey={0}> {this.state.steps[0].workspace} </Tab.Pane>);
        workspaces.push(<Tab.Pane eventKey={0}> workspace for step {0} </Tab.Pane>);

        for (let i = 1; i <= this.state.step_num; i += 1) {
            const equipments = this.state.equipments[i];
            // workspaces.push(<Tab.Pane eventKey={i}> {this.state.steps[i].workspace} </Tab.Pane>);
            workspaces.push(
                <Tab.Pane
                    eventKey={i}
                    onDrop={this.drop_handler} onDragOver={this.dragover_handler}
                    style={{height:"100%"}}>
                workspace for step {i}
                <div style={{height:"100%"}}>

                    {equipments.map((equipment,index) => (

                        <Draggable_equipment wkspace_id={i} equip_id={index}
                                             interation_handler= {this.interation_handler}
                                             handle_equip_delete={this.handle_equip_delete}
                                             image={equipment}
                                             left={50} top={10} width={200} height={200}/>

                    ))
                    }
                    <Overlay
                        show={this.state.showPopover}
                        target={this.target}
                        placement="bottom"
                        container={this.ref.current}
                        containerPadding={20}
                        rootClose={true}
                        onHide={() => this.setState({ showPopover: false })}
                    >
                        <Popover id="popover-contained">
                            <Popover.Title as="h3">Interaction</Popover.Title>
                            <Popover.Content>
                                input: {this.eq1}
                            </Popover.Content>
                        </Popover>
                    </Overlay>

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
    handleAddEquipment= (step,image) =>
    {


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



    };


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
export function move_element(ev){
    const offset = ev.dataTransfer.getData("text/offset").split(',');
    const dm = document.getElementById(ev.dataTransfer.getData("text/id"));
    dm.style.left = (ev.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (ev.clientY + parseInt(offset[1],10)) + 'px';
    // console.log(dm.style);
}


export default create_lab;