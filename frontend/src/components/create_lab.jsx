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
    OverlayTrigger, Tooltip,
    Overlay, Popover
} from "react-bootstrap";
import Redirect from "react-router-dom/es/Redirect";
import {Link} from "react-router-dom";
import {Instruction} from "./instruction";
// import {Workspace} from "./Droppable_space";
import Step from "../Step.js";
import {Slides} from "./Slides";
// import EditableLabel from 'react-editable-label';
import {EquipmentList} from "./EquipmentList";
import {EquipmentInfo} from "./EquipmentInfo";
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
import Workspace from "../Workspace"
import NavDropdown from "react-bootstrap/NavDropdown";
import EditableLabel from "./EditableLabel";
import deepCloneWithType from "../clone"

class create_lab extends React.Component {
    constructor(props) {
        super(props);

        this.steps = [new Step(0)];
        this.equipmentSet = new EquipmentSet();
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
            input:0,
            popoverWarning:"",
            importStep:1,
            currentStep:0,
            currentEquipment:undefined,
            viewInfo:false,


        };

        this.handleAddEquipment = this.handleAddEquipment.bind(this);
        this.interaction_handler = this.interaction_handler.bind(this);
        this.handle_equip_delete = this.handle_equip_delete.bind(this);
        this.canInteract = this.canInteract.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.drop_handler = this.drop_handler.bind(this);
        this.move_element = this.move_element.bind(this);
        this.selectStep = this.selectStep.bind(this);
        this.getInfo = this.getInfo.bind(this);
    }
    populateStepEquipment(equipList)
    {

            let equip;
        var result =[];

            for (var i = 0; i < equipList.length; i++) {
                var current = equipList[i];

                if(current.type==="Solution")
                {
                    equip = new Element(current.name, current.image, current.capacity,
                        current.weight, current.state, current.svg, current.size,
                    );
                    equip.setDisabled(current.disabled)
                    equip.setLocation(current.x,current.y)

                    result.push(equip)
                }
                else if(current.type==='Tools')
                {
                    equip = new Tool(current.name, current.image);
                    equip.setDisabled(current.disabled)
                    equip.setLocation(current.x,current.y)

                    result.push(equip);

                }
                else {

                    equip = new Glassware(current.name, current.image, current.capacity,
                        current.weight,current.state,current.svg, current.size);
                    equip.setDisabled(current.disabled);
                    equip.setType(current.type);
                    equip.setLocation(current.x,current.y);
                    result.push(equip);

                }


            }

            return result;


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
            // console.log("current equipment set",this.equipmentSet)
            // console.log("setting to new equipment set",result)
            this.equipmentSet.setEquipmentList(result);

        }
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
                for (var i = 1; i < step_list.length; i++) {
                    this.state.steps.push(new Step(i, step_list[i].instruction));
                    this.state.equipments[i]=this.populateStepEquipment(step_list[i].equipments);

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

        //TODO:autosave commented out for testing purposes
        //autosave
        // this.handleLabSave()
        this.setState({
            redirectHome: true
        })
    };

    setViewInfo=()=>{
        this.setState({
            viewInfo: !this.state.viewInfo
        })
    }


    getInfo(e,data)
    {
        const workspace_id = data.workspace_id;
        const eq_id = parseInt(data.equip_id);


        const source = this.state.equipments[workspace_id][eq_id];

        this.setState({
            currentEquipment: source,
            viewInfo:true
        }, () => {
            console.log(this.state.currentEquipment)
            console.log(this.state.viewInfo)

        })
        // this.setViewInfo();
        this.forceUpdate()
    }

    setRestart = () => {

        // console.log(this.state.equipments)
        const temp = this.state.steps;
        const temp_equip = this.state.equipments;
        temp_equip[this.state.currentStep]=[];

        this.setState({
            // restart: true,      //should probably just be restarting a single step
            temp_equip,

        });
    };


    banner() {
        return (
            <div className="banner">

                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )

    }

    setStepsEquips()
    {
        this.state.steps.map((step,index)=>(
            step.setEquipments(this.state.equipments[index])

            ));

        // console.log("populated equipment set in steps in setStepsEquips" ,this.state.steps);
    }


    handleLabSave = (e) => {
     // alert("saving " +this.state.lab_id)
        this.setStepsEquips()
        const lab = {
            labID: this.state.lab_id,
            //if zero, it's not a valid labID

            lab_name: this.state.lab_title,
            author: this.props.email,

            steps: this.state.steps,
            equipments: this.equipmentSet.getJSONList(),
            // lastModified: new Date(),
        };

        // console.log("lab.lastModified", lab.lastModified);

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
    handleEnterTitle=(value)=>
    {

        if(value.length>85)
        {
            ToastsStore.error("Limit title length to 85 characters")
            this.setState({lab_title:this.state.lab_title})
            value=this.state.lab_title
            this.forceUpdate()

            return
        }

        this.setState({lab_title:value})
    }

    toolbar()
    {
        {
            return (
                <Navbar style={{backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",marginLeft: 40, marginRight: 40, marginTop: 10, marginBottom: 10}}
                        className={"justify-content-between bar"}>
                    <Nav>
                        <EditableLabel
                            labelClass="lab_title_label"
                            inputClass="lab_title_input"
                            initialValue={this.state.lab_title}
                            value={"hello"}
                            save={value => {
                                this.handleEnterTitle(value);}
                            }

                        />
                    </Nav>

                    <Nav>

                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Start fresh. All contents are wiped at the current step
                                </Tooltip>
                            }
                        >
                            <Image className={"restart_image"}
                                   onClick={this.setRestart}
                                   src={"https://cdn0.iconfinder.com/data/icons/basic-ui-elements-plain/461/012_restart-512.png"}
                            rounded />
                        </OverlayTrigger>


                        {/*<Image onClick={this.finishSelectEquipment} className={"buttons"} src={"https://icon-library.net/images/finished-icon/finished-icon-21.jpg"} />*/}


                        {/*<OverlayTrigger*/}
                        {/*    overlay={*/}
                        {/*        <Tooltip>*/}
                        {/*            Trash selected item*/}
                        {/*        </Tooltip>*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    <Image className={"buttons"} src={"https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png"} />*/}
                        {/*</OverlayTrigger>*/}


                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Save your edits
                                </Tooltip>
                            }
                        >
                            <Image className={"save_image"} onClick={this.handleLabSave}
                                   src="https://cdn2.iconfinder.com/data/icons/web-application-icons-part-2/100/Artboard_73-512.png"
                                   rounded/>
                        </OverlayTrigger>

                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Exit and go back to home.
                                </Tooltip>
                            }
                        >
                            <Link to="/instructor_labs">
                                <Image onClick={this.setRedirectHome} className={"config_image"}
                                       src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/exit-512.png"
                                       rounded/>
                            </Link>
                        </OverlayTrigger>




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

                {this.getEquipmentTab(i)}
                <span>instruction for step {i} </span>{this.instruction(i)}</Tab.Pane>);
            }


        return(
            <Tab.Content >

                {instructions}
            </Tab.Content>
        )

    }

    getEquipmentTab(i)
    {
        // setViewInfo
        if(this.state.viewInfo===true)
            return  <EquipmentInfo getEquipments={this.setViewInfo} equipment={this.state.currentEquipment}/>
        else
            return  <EquipmentList style={{height:"8vh"}} set={this.equipmentSet.getEquipments()} step={i} handleAddEquipment={this.handleAddEquipment}/>



    }

    canInteract(workspace_id1, eq_id1, workspace_id2, eq_id2){
        const eq1 = this.state.equipments[workspace_id1][eq_id1];
        const eq2 = this.state.equipments[workspace_id2][eq_id2];
        return eq1.canInteract(eq2);
    }
    interaction_handler(target_ev, workspace_id1, eq_id1, workspace_id2, eq_id2){
        const source = this.state.equipments[workspace_id1][eq_id1];
        const target = this.state.equipments[workspace_id2][eq_id2];
        const interactable = source.canInteract(target);

        if(interactable){
            this.eq1 = source;
            this.eq2 = target;
            let actions = source.getActions(target);
            this.target = target_ev;
            if(actions){
                this.setState({showPopover:true});
            }
            else{
                source.interact(target);
            }
        }



    }

    handle_equip_delete(e,data){

        const workspace_id = data.workspace_id;
        const eq_id = parseInt(data.equip_id);

        // console.log(data);
        let temp = this.state.equipments;
        // delete temp[workspace_id][eq_id];
        // console.log(temp[workspace_id][1]);
        // console.log(temp);

        const removed = temp[workspace_id].splice(eq_id,1);

        this.setState({equipments: temp});
        // console.log(removed);
        // console.log(temp);
    }



    drop_handler(ev) {
        // ev.preventDefault();
        if (ev.stopPropagation) {
            ev.stopPropagation(); // Stops some browsers from redirecting.
        }
        this.move_element(ev);
        return false;
    }
    dragover_handler(ev) {
        if (ev.preventDefault) {
            ev.preventDefault(); // Necessary. Allows us to drop.
        }
        ev.dataTransfer.dropEffect = "move";
        return false;

    }

    handleSubmit(e){
        e.persist();
        const source = this.eq1;
        const target = this.eq2;
        const actions = source.getActions(target);
        // console.log(e);

        const data = new FormData(e.target);
        // console.log(data);
    }
    handleInputChange(e){
        this.setState({input: e.target.value},);

    }

    handleImportChange(e)
    {
        this.setState({importStep:e.target.value})
    }
    handleImport(e,step)
    {
        if(this.state.importStep<0 || this.state.importStep>this.state.step_num)
        {
            ToastsStore.error("Cannot import from an invalid step")
            return
        }
        if(parseInt(this.state.importStep)===step)
        {
            ToastsStore.error("Cannot import from current step")
            return
        }


        var temp = this.state.equipments;

        //TODO:INSTEAD OF SLICE() SHOULD USE A DEEP CLONE OF THE OBJECTS
        //right now temp is filled with image sources of equipments
        temp[step]=temp[this.state.importStep].slice();
        this.setState(
            {equipments:temp}
        )
    }
    setPopoverWarningMsg(msg){

        this.setState({popoverWarning:msg},()=>(alert(msg)));
    };

    handleAction(source, action,target,input){
        source[action](target,parseFloat(input));
        this.forceUpdate();
    }

    popover(){
        const source = this.eq1;
        const target = this.eq2;
        let source_name = null;
        let target_name = null;
        let buttonList = [];

        if(source !== undefined && target !== undefined){
            source_name=source.name;
            target_name=target.name;
            const actions = source.getActions(target);
            if(actions){

                actions.map((action)=>(
                    buttonList.push(<Button variant="primary" size={'sm'} onClick={()=>this.handleAction(source,action,target,this.state.input)}>{action}</Button>)

                // buttonList.push(<Button variant="primary" size={'sm'} onClick={()=>source[action](target,this.state.input, this.setPopoverWarningMsg)}>{action}</Button>)
                ));
            }
            else{
                source.interact(target);
            }
        }
        const overflow_msg = "Target Vessels will Overflow. Your Desired volume has not been completely transferred.";


        return(
        <Overlay
            show={this.state.showPopover}
            target={this.target}
            placement="bottom"
            container={this.ref.current}
            containerPadding={20}
            rootClose={true}
            onHide={() => this.setState({ showPopover: false })}
            style={{width:400}}
        >
            <Popover id="popover-contained" >
                <Popover.Title >
                    <div className={"col1"}>
                        <strong>Action</strong>
                    </div>
                    <div className={"col2"}>
                        <a className="close" onClick={()=>this.setState({showPopover: false})}/>
                    </div>
                </Popover.Title>
                <Popover.Content>

                        <div className="arrowBox">
                            <form className="form-inline" role="form" onSubmit={this.handleSubmit}>
                                <FormGroup controlId="popover_input">
                                    <FormControl
                                        // style={{height: 60}}
                                        style={{width:150}}
                                        autoFocus
                                        type="number"
                                        placeholder="Volume (mL)"
                                        onChange={(e) => this.handleInputChange(e)}
                                        required
                                    />
                                </FormGroup>


                                <div>
                                    {buttonList}
                                </div>
                            </form>
                            <div className="transferVessels" >
                                From <strong>{source_name}</strong> to <strong>{target_name}</strong>
                            </div>
                            <div id="transferInputWarning" className="inputWarning" style={{display:null}}>
                                {this.state.popoverWarning}
                            </div>
                            {/*<span id="transferFeedback" className="transferFeedback"*/}
                            {/*      style="display:none;color:white"></span>*/}
                        </div>
                </Popover.Content>
            </Popover>
        </Overlay>
        )
    }
    workspacePane(){
        const workspaces = [];

        // workspaces.push(<Tab.Pane eventKey={0}> {this.state.steps[0].workspace} </Tab.Pane>);
        workspaces.push(<Tab.Pane eventKey={0}>
            <span>workspace for step {0}</span>
            <ToastsContainer store={ToastsStore}/>
        </Tab.Pane>);

        for (let i = 1; i <= this.state.step_num; i += 1) {
            const equipments = this.state.equipments[i];
            // workspaces.push(<Tab.Pane eventKey={i}> {this.state.steps[i].workspace} </Tab.Pane>);
            workspaces.push(
                <Tab.Pane
                    eventKey={i}
                    onDrop={this.drop_handler} onDragOver={this.dragover_handler}
                    style={{height:"100%"}}>

                    <div>
                        {/*<span style={{left:"50%"}}>workspace for step {i}</span>*/}

                    <NavDropdown title="Import from" id="nav-dropdown"
                                 style={{float:"right",display:"inline-block",width:"240px"}}>

                            <form style={{height:"40px",display:"inline-block",background: "rgba(255, 0, 0, 0.1);"}} role="form" onSubmit={(e)=>this.handleImport(e,i)}>
                                <span style={{marginLeft:10}}>Step</span>
                                <FormGroup controlId="popover_input" style={{display:"inline-block"}}>
                                    <FormControl
                                        // style={{height: 60}}
                                        style={{width:60,marginLeft:10}}
                                        autoFocus
                                        type="number"
                                        value={this.state.importStep}
                                        onChange={(e) => this.handleImportChange(e)}

                                    />
                                </FormGroup>
                                <Button className={"import"} onClick={(e)=>this.handleImport(e,i)}>Import</Button>

                            </form>


                    </NavDropdown>
                    </div>
                <div style={{height:"100%"}}>

                    {equipments.map((equipment,index) => (

                        <Draggable_equipment wkspace_id={i} equip_id={index}
                                             interation_handler= {this.interaction_handler}
                                             getInfo={this.getInfo}
                                             canInteract = {this.canInteract}
                                             handle_equip_delete={this.handle_equip_delete}
                                             equipment={equipment}
                                             move_element={this.move_element}
                                             width={200} height={200}/>

                    ))
                    }

                    {this.popover()}


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
        // adding a new step
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


    };

    createNewEquipment(equipment)
    {
        return deepCloneWithType(equipment);

    }

    handleAddEquipment= (step,equipment) =>
    {
        if(step===0)
        {
            this.forceUpdate();
            return
        }

        // var image = equipment;

        const current = this.state.equipments;
        if(current[step].length>=10)
        {
            ToastsStore.error("Workspace full! Only ten equipments allowed")
        }
        else
        {
            current[step].push(this.createNewEquipment(equipment));
            //            <Draggable_equipment image={image} x={500} y={100} width={this.state.equipments.length*100} height={this.state.equipments.length*100}/>

            this.setState(
                {
                    equipments:current
                }, () => {
                    console.log(this.state.equipments);
                }
            )
        }
    };


    selectStep(e,i){
        this.setState({currentStep:i},

        );

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
                        <Col style={{marginLeft:"4%",justifyContent:'center',alignItems:"center",height: '80vh',overflowY:"scroll",backgroundColor:"#136389"}}  lg={{span:1}} >
                            {/*{this.slides()}*/}
                            {/*<Slides slide_num={this.state.steps.length} addChild={this.handleAddChild}/>*/}
                            <Slides slide_num={this.state.step_num} addChild={this.handleAddChild} onSelect={this.selectStep}/>
                        </Col>
                        <Col style={{justifyContent:'center',alignItems:"center",height: '80vh',backgroundColor:"#388a9c"}}  lg={{span:3}} >
                                {this.instructionPane()}
                        </Col>

                        <Col lg={{span:7}} style={{backgroundColor:"#67a8a1"}} >
                            {this.workspacePane()}


                        </Col>

                    </Row>
                </Tab.Container>
            </div>
        )
    }
    move_element(ev){
        const offset = ev.dataTransfer.getData("text/offset").split(',');
        const dm = document.getElementById(ev.dataTransfer.getData("text/id"));
        dm.style.left = (ev.clientX + parseInt(offset[0],10)) + 'px';
        dm.style.top = (ev.clientY + parseInt(offset[1],10)) + 'px';
        // console.log("moving element ",dm.style.left)
        // console.log("moving element ",dm.style.top)

        const workspace_id = ev.dataTransfer.getData('text/workspace_id');
        const equip_id = ev.dataTransfer.getData('text/equip_id');

        const source = this.state.equipments[workspace_id][equip_id];
        source.setLocation((ev.clientX + parseInt(offset[0],10)),(ev.clientY + parseInt(offset[1],10)));
        // console.log("moving ",workspace_id,equip_id,source);
    }

    adjust_interactive_element(ev,src_workspace,src_equip,target_workspace,target_equip){
        const src_id = "workspace"+src_workspace+"equip"+src_equip;
        const targ_id = "workspace"+target_workspace+"equip"+target_equip;
        const src = this.state.equipments[src_workspace][src_equip];
        const targ = this.state.equipments[target_workspace][target_equip];

        const offset = ev.dataTransfer.getData("text/offset").split(',');

        const dm = document.getElementById(ev.dataTransfer.getData("text/id"));
        dm.style.left = (ev.clientX + parseInt(offset[0],10)) + 'px';
        dm.style.top = (ev.clientY + parseInt(offset[1],10)) + 'px';
        // console.log("moving element ",dm.style.left)
        // console.log("moving element ",dm.style.top)

        const workspace_id = ev.dataTransfer.getData('text/workspace_id');
        const equip_id = ev.dataTransfer.getData('text/equip_id');

        const source = this.state.equipments[workspace_id][equip_id];
        source.setLocation((ev.clientX + parseInt(offset[0],10)),(ev.clientY + parseInt(offset[1],10)));
        // console.log("moving ",workspace_id,equip_id,source);
    }

}


export default create_lab;