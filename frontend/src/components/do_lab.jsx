import React, {Component} from 'react';
import icon from "../Images/v.jpg";
import deepCloneWithType from "../clone";
import '../stylesheets/banner.css';
import '../stylesheets/student_lab.css';
import '../stylesheets/create_lab.css';
import { Drag } from "./testDrag";
import {Expandable_Classes} from "./expandable_course";
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
import Workspace from "../Workspace"


class DoLab extends React.Component {
    constructor(props) {
        super(props);

        this.steps = [];
        this.equipmentSet = new EquipmentSet();
        this.target = null;
        this.ref = React.createRef();

        this.state = {
            showPopover: false,
            redirectHome: false,
            restart:false,
            steps : [],
            step_num: 0,
            completedSteps:0,
            lab_id:0,
            lab_loaded:false,
            lab_title:"Untitled Lab",
            equipments:[],
            input:0,
            currentStepCopy:null,
            popoverWarning:"",
            slide:undefined,
            currContainer:undefined,
            reRender:false,
            testInt:1,

        };

        this.handleAddEquipment = this.handleAddEquipment.bind(this);
        this.interaction_handler = this.interaction_handler.bind(this);
        this.handle_equip_delete = this.handle_equip_delete.bind(this);
        this.drop_handler = this.drop_handler.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.canInteract = this.canInteract.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.move_element = this.move_element.bind(this)
        this.adjust_interactive_element=this.adjust_interactive_element.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.selectStep = this.selectStep.bind(this);
    }
    selectStep(e,i){
        this.setState({currentStep:i},

        );

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

    populateStepEquipment(equipList)
    {

        let equip;
        var result =[];
        const solutions=['General','Acids','Indicators','Bases','Stock Solutions'];
        const glassware=['Titration Flasks','Graduated Cylinders',"Beakers","Volumetric Flasks","Pipettes"]


        for (var i = 0; i < equipList.length; i++) {
            var current = equipList[i];



            if(solutions.includes(current.type))
            {
                equip = new Element(current.name, current.image, current.capacity,
                    current.weight, current.state, current.size,current.chemProp,current.amount
                );
                // name, image ,capacity, weight, state=1,size=100,chemProp,amount=capacity
                equip.setType(current.type);
                equip.setDisabled(current.disabled)
                equip.setLocation(current.left,current.top)
                equip.setColor(current.color)

                result.push(equip)
            }
            else if(!glassware.includes(current.type))
            {
                equip = new Tool(current.name, current.image);
                equip.setDisabled(current.disabled)
                equip.setLocation(current.left,current.top)
                equip.setColor(current.color)



                result.push(equip);

            }
            else {


                equip = new Glassware(current.name, current.image, current.capacity,
                    current.weight,current.state, current.size,current.amount);
                equip.setItems(current.items)
                equip.setDisabled(current.disabled);
                equip.setType(current.type);
                equip.setLocation(current.left,current.top);
                equip.setColor(current.color)

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
                'Solution': {},
                'Tools': [],
                'Glassware': {},

            };

            const solutions=['General','Acids','Indicators','Bases','Stock Solutions'];
            const glassware=['Titration Flasks','Graduated Cylinders',"Beakers","Volumetric Flasks","Pipettes"]

            for (var i = equipList.length-1; i >=0; i--) {
                var current = equipList[i];

                if(solutions.includes(current.type))

                {
                    if(result['Solution'][current.type]===undefined)
                        result['Solution'][current.type]=[]

                    var equip = new Element(current.name, current.image, current.capacity,
                        current.weight, current.state, current.size,current.chemProp,current.amount);

                    equip.setType(current.type);
                    equip.setDisabled(current.disabled)
                    result['Solution'][current.type].push(equip)

                }
                else if(!glassware.includes(current.type))
                {
                    var equip =new Tool(current.name, current.image,current.weight);
                    equip.setType(current.type);
                    equip.setDisabled(current.disabled)
                    result['Tools'].push(equip);
                }
                else {
                    if(result['Glassware'][current.type]===undefined)
                        result['Glassware'][current.type]=[]

                    var equip = new Glassware(current.name, current.image, current.capacity,current.weight,1,current.size);
                    equip.setDisabled(current.disabled)
                    equip.setType(current.type)
                    result['Glassware'][current.type].push(equip);
                }



            }
            this.equipmentSet.setEquipmentList(result);

        }
    }

    compare(a, b) {
        if (a.stepNum > b.stepNum) return 1;
        if (b.stepNum > a.stepNum) return -1;

        return 0;
    }



    populateSteps()
    {    console.log("populating,state is ")
        console.log(this.props.location.state.equipments)
        //if not new lab, load old lab
        if(this.props.location.state!==undefined){

            //get steps from prop
            var step_list = this.props.location.state.steps;
            console.log((this.props.location.state.steps))
            step_list.sort(this.compare)
            //opening a previously saved lab
            if (step_list !== undefined)
            {
                for (var i = 1; i <step_list.length ; i++) {
                    console.log("steplist["+i+"] = " );console.log(step_list[i]);
                    this.state.steps.push(step_list[i]);

                    this.state.equipments[i]=this.populateStepEquipment(step_list[i-1].equipments);

                    console.log(this.state.equipments[i])

                }

            }
            console.log("ABC EQUI{S IS ")
            console.log(this.state.equipments)
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
            //this.setStepsEquips()
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
    setStepsEquips()
    {
        console.log("YERR CURRENT EQUP IS "+JSON.stringify(this.state.equipments))

        let i=0;
        for (i=0; i<this.state.steps.length; i++){
            console.log("this step is "+JSON.stringify(this.state.steps[i]));
            console.log("this equip is "+this.state.equipments[i+1])
            this.state.steps[i].setEquipments(this.state.equipments[i-1])
            console.log("now this step is "+JSON.stringify(this.state.steps[i]));
        }
      /*  this.state.steps.map((step,index)=>(

            step.setEquipments(this.state.equipments[count++])

        ));*/

        console.log("populated equipment set in steps in setStepsEquips" ,this.state.steps);
    }
    setRedirectHome = () => {
        if (!window.confirm("Are you sure you would like to leave? Progess will not be saved.")){
            return null;
        }
        this.setState({
            redirectHome: true
        })
    };

    setRestart = (step_id) => {



        if (!window.confirm("Are you sure you would like to restart this step?")){
            return null;
        }

        console.log("steps is  ");
        console.log(this.state.equipments);
        console.log("current step is "+this.state.completedSteps)
        let stepNum=this.state.completedSteps+1;
        if (stepNum==1){
            console.log(this.state.equipments);
            this.state.equipments[1]=[]
            this.setState({testInt:12}) // DONT DELETE, THE CODE DOESNT WORK WITHOUT IT IDK
            this.render()
            return null
        }
        console.log("copy is ");
        console.log(this.state.currentStepCopy)
        this.state.equipments[stepNum]=deepCloneWithType(this.state.currentStepCopy)
        console.log("steps is  ");
        console.log(this.state.equipments);
        this.setState({testInt:12}) // DONT DELETE, THE CODE DOESNT WORK WITHOUT IT IDK
        this.render()

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
        // alert("saving " +this.state.lab_id)
        const lab = {
            labID: this.state.lab_id,
            //if zero, it's not a valid labID

            lab_name: this.state.lab_title,
            author: this.props.email,

            steps: this.state.steps,
            equipments: this.equipmentSet.getJSONList(),
            // lastModified: new Date(),
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
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Check to see if you successfully completed the step.
                                </Tooltip>
                            }
                        >

                                <Button onClick={this.completeStep} style={{backgroundColor: "black"}}>Check Step</Button>

                        </OverlayTrigger>

                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Start fresh. All contents are wiped at the current step
                                </Tooltip>
                            }
                        >

                            <Button onClick={this.setRestart} style={{backgroundColor: "black"}}>Restart</Button>

                        </OverlayTrigger>


                        {/*<Image onClick={this.finishSelectEquipment} className={"buttons"} src={"https://icon-library.net/images/finished-icon/finished-icon-21.jpg"} />*/}


               {/*         <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Trash selected item
                                </Tooltip>
                            }
                        >
                            <Image className={"buttons"} src={"https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png"} />
                        </OverlayTrigger>*/}


                     {/*   <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Save your edits
                                </Tooltip>
                            }
                        >
                            <Image className={"save_image"} onClick={this.handleLabSave}
                                   src="https://cdn2.iconfinder.com/data/icons/web-application-icons-part-2/100/Artboard_73-512.png"
                                   rounded/>
                        </OverlayTrigger>*/}

                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Exit. Remember to save your edits.
                                </Tooltip>
                            }
                        >

                                <Image onClick={this.setRedirectHome} className={"config_image"}
                                       src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/exit-512.png"
                                       rounded/>

                        </OverlayTrigger>




                    </Nav>

                </Navbar>
            )
        }

    }


    instruction(index)
    {
       // console.log("index is "+index)
        //,width: '20rem' for div
        return(
            <div style={{padding: 10,height:'30vh'}}>

                <textarea
                    style={{resize:"none",height:"100%",width:"100%",borderStyle:"solid",borderWidth:1,color:"black"}}
                    placeholder="Input instruction for this step here"
                    readOnly = "true"
                    value={this.state.steps[index-1].instruction}
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
        //console.log("state is "+JSON.stringify(this.state))
        for (let i = 1; i <= this.state.step_num; i += 1) {
            // instructions.push(<Tab.Pane eventKey={i}> {this.state.steps[i].instruction} </Tab.Pane>);
            console.log("i is "+i)
            instructions.push(<Tab.Pane eventKey={i}>
                <EquipmentList set={this.equipmentSet.getEquipments()} step={i+1} handleAddEquipment={this.handleAddEquipment}/>

                {this.setupInstruction(i,this.state.steps[i-1].instruction)}</Tab.Pane>);
        }


        return(
            <Tab.Content>

                {instructions}
            </Tab.Content>
        )

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
        console.log("CALLED ")
        console.log("source is ");
        console.log(source);
        console.log("target is ");
        console.log(target);
        if(interactable){
            this.eq1 = source;
            this.eq2 = target;
            let actions = source.getActions(target);
            this.target = target_ev;
            if(actions){
                this.setState({showPopover:true});
                this.forceUpdate()
            }
            else{
                console.log("source is ");
                console.log(source);
                source.interact(target);
                this.forceUpdate()
            }
        }



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

        this.move_element(ev);
        return false;
    }

    move_element(ev){
        const offset = ev.dataTransfer.getData("text/offset").split(',');
        const source_dm = document.getElementById(ev.dataTransfer.getData("text/id"));
        var x =(ev.clientX + parseInt(offset[0],10));
        var y = (ev.clientY + parseInt(offset[1],10));

        const workspace_id = ev.dataTransfer.getData('text/workspace_id');
        const workspace_dm = document.getElementById("workspace"+workspace_id);

        const bounds = this.getBoundingXY(x,y,workspace_dm,source_dm);
        x=bounds[0];
        y=bounds[1];

        source_dm.style.left = x + 'px';
        source_dm.style.top = y + 'px';

        console.log("client",ev.clientX,"x",x);
        console.log("client",ev.clientY,"y",y);



        const equip_id = ev.dataTransfer.getData('text/equip_id');

        const source = this.state.equipments[workspace_id][equip_id];
        source.setLocation(x,y);
        // console.log("moving ",workspace_id,equip_id,source);
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
        console.log(e);

        const data = new FormData(e.target);
        console.log(data);
    }
    handleInputChange=(e)=>{
        console.log("e is abc123")
        console.log(e)
        this.setState({input: e},()=>{
            console.log("input is now "+e)
        });

    }

    onHide=(source)=>
    {
        source.setDegree(0);
        source.setInteracting(false);

        this.setState({ showPopover: false })
    }

    hidePopOver=()=>
    {
        if(this.eq1!==undefined)
            this.onHide(this.eq1)
    }


    setPopoverWarningMsg(msg){

        this.setState({popoverWarning:msg},()=>(alert(msg)));
    };
    handleAction(source, action,target,input){


        console.log("HANDLING ACTION SOURCE IS "+source+"Action is "+action + " target is "+target + " input is "+input)
        source[action](target,parseFloat(input));
        this.setState({input:1})
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
                    buttonList.push(<button style={{width:"100%"}} variant="primary" size={'sm'} onClick={()=>this.handleAction(source,action,target,this.state.input)}>{action}</button>)

                    // buttonList.push(<Button variant="primary" size={'sm'} onClick={()=>source[action](target,this.state.input, this.setPopoverWarningMsg)}>{action}</Button>)
                ));
            }
            else{
                source.interact(target);
            }
        }
        if (target==undefined)return null
        const overflow_msg = "Target Vessels will Overflow. Your Desired volume has not been completely transferred.";
        console.log("target is ")
        console.log(target)
        let incRate =.2
        if (target!==undefined)
         incRate =target.capacity/100;
        let capacity=100;
        if (target!==undefined)
            capacity=target.capacity
        console.log("capacity is "+capacity +" target is "+target)

        return(

            <Overlay
                show={this.state.showPopover}
                target={this.target}
                placement="bottom"
                container={this.ref.current}
                containerPadding={20}
                rootClose={true}
               // onHide={() => this.setState({ showPopover: false })}
                style={{width:900}}
            >
                <Popover id="popover-contained" >
                    <Popover.Title  style={{width:150}}>
                        <div className={"col1"}>
                            <strong>Action</strong>
                        </div>
                        <div className={"col2"}>
                            <a className="close" onClick={()=>this.setState({showPopover: false})}/>
                        </div>

                        {<Drag  incValue={incRate} capacity={capacity}handleChange={this.handleInputChange}/>}
                        <div>
                            {buttonList}


                        </div>

                    </Popover.Title>
                    <Popover.Content>
                        <drag>

                        </drag>
                    </Popover.Content>
                </Popover>
            </Overlay>
        )
    }

    workSpacePaneRestart(i){
        const equipments = this.state.equipments[i];
    }

    workspacePane(){
        const workspaces = [];

        // workspaces.push(<Tab.Pane eventKey={0}> {this.state.steps[0].workspace} </Tab.Pane>);
        //workspaces.push(<Tab.Pane eventKey={0}> workspace for step {0} </Tab.Pane>);
        console.log("equips is ")
        console.log(this.state.equipments)
        for (let i = 1; i <= this.state.step_num; i += 1) {
            const equipments = this.state.equipments[i];
            if (equipments==undefined)break;
            console.log("equip is ")
            console.log(equipments)
            // workspaces.push(<Tab.Pane eventKey={i}> {this.state.steps[i].workspace} </Tab.Pane>);
            workspaces.push(
                <Tab.Pane
                    eventKey={i}
                    onDrop={this.drop_handler} onDragOver={this.dragover_handler}
                    style={{height:"100%"}}>
                    workspace for step {i}
                    <div style={{height:"100%"}}
                         id={"workspace"+i}
                    >

                        {equipments.map((equipment,index) => (

                            <Draggable_equipment wkspace_id={i} equip_id={index}
                                                 interation_handler= {this.interaction_handler}
                                                 getInfo={this.getInfo}
                                                 canInteract = {this.canInteract}
                                                 handle_equip_delete={this.handle_equip_delete}
                                                 equipment={equipment}
                                                 role="student"
                                                 move_element={this.move_element}
                                                 adjust={this.adjust_interactive_element}
                                                 width={200} height={200}
                                                 hide={this.hidePopOver}/>


                        ))
                        }

                        {this.popover()}


                        <ToastsContainer store={ToastsStore}/>
                    </div>
                </Tab.Pane>);
        }
        console.log("PUSHED!")
        console.log(this.state.equipments)
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
        alert(equipment.name+" "+equipment.disabled)


    };

    handleAddEquipment= (step,equipment) =>
    {
        if(step===0)
        {
            this.forceUpdate();
            return
        }
        step=step-1;
        // var image = equipment;

        const current = this.state.equipments;
        console.log("current is "+JSON.stringify(current )+"step is "+JSON.stringify(step))
        if (this.state.equipments[0]==null){
            this.state.equipments[0]=[]
        }
        if (current[step]==null){

            current[step] = []
        }
        if(current[step].length>=10)
        {
            ToastsStore.error("Workspace full! Only ten equipments allowed")
        }
        else
        {
            current[step].push(equipment);
            //            <Draggable_equipment image={image} x={500} y={100} width={this.state.equipments.length*100} height={this.state.equipments.length*100}/>

            this.setState(
                {
                    equipments:current
                }, () => {
                    console.log(this.state.equipments)
                }
            )
        }
        console.log("now current is "+JSON.stringify(current )+"step is "+JSON.stringify(step))
    };
     makeSlide(){
        var currslide =
                <Slides id="slides"steps={this.state.steps}onSelect={this.selectStep}
                    completedSteps={this.state.completedSteps} slide_num={this.state.step_num} addChild={this.handleAddChild}
                            role={"student"}/>;
        this.setState({slide:currslide});
    }
    callbackFirstRender(){
         this.render();
         console.log("NOW copy is "+this.state.currentStepCopy)
         console.log(this.state.currentStepCopy)
        this.setState({reRender: false},this.callbackSecondRender)
    }
    callbackSecondRender(){
         this.render()
    }
    callback(){
         console.log("called back!")
        var currslide =
            <Slides id="slides"steps={this.state.steps}onSelect={this.selectStep}
                    completedSteps={this.state.completedSteps} slide_num={this.state.step_num} addChild={this.handleAddChild}
                    role={"student"}/>;
        this.setState({slide:currslide});
        console.log("completed steps is "+this.state.completedSteps);
        console.log("steps is");
        console.log(this.state.steps)
        console.log("stepcopy is");
        console.log(this.state.currentStepCopy)
        console.log("should be ");
        console.log(this.state.equipments[this.state.completedSteps+1])
        console.log(this.state.equipments)
        ToastsStore.success("Step completed!")

        let cloneCopy;
        cloneCopy=deepCloneWithType(this.state.equipments[this.state.completedSteps+1]);
        console.log(cloneCopy)
        console.log(this.state.equipments[this.state.completedSteps+1])
        //this.state.equipments[this.state.completedSteps+1].push("test")
        console.log(cloneCopy)
        console.log(this.state.equipments[this.state.completedSteps+1])

        this.setState({reRender: true,currentStepCopy:cloneCopy},this.callbackFirstRender)

    }


    arraysEqual(arr1,arr2){
         if (arr1.length!=arr2.length)return false;
         for (let i=0; i<arr1.length; i++){
             if (arr1[i].name!=arr2[i].name||arr1[i].capacity!=arr2[i].capacity||arr1[i].weight!=arr2[i].weight)return false;
         }
         return true;
    }

    verifyAmounts(eq1, eq2){
         let grace = Math.min(eq2.capacity/10,5);
         return Math.abs(eq1.amount-eq2.amount)<grace;
    }

    verifyStep( stepEquips,studentEquips) {
        let m = stepEquips.length;
        let n = studentEquips.length;
        console.log("step equip is ");console.log((stepEquips))
        console.log("verifying step, studentEquips = ");console.log((studentEquips));

        const solutions=['General','Acids','Indicators','Bases','Stock Solutions'];

        let unused=[];
        let arr = []
        for (let i = 0; i < m; i ++) {
            arr.push(false)
        }
        for (let i=0; i<n; i++){
            unused.push(true);
        }
        for (let i = 0; i < m; i ++) {
            let equip1 = stepEquips[i]
            for (let j = 0; j < n; j ++) {
                let equip2 = studentEquips[j]
                /* check for same type equipment and same volume, amount */
                if (equip1.name === equip2.name &&
                    this.verifyAmounts(equip1,equip2)
                    &&equip1.capacity==equip2.capacity
                &&this.arraysEqual(equip1.items,equip2.items)&&unused[j]) {
                    arr[i] = true
                    unused[j]=false;
                    break;
                }
                if (solutions.includes(equip1.type)&&equip1.name === equip2.name ){
                    arr[i] = true
                    unused[j]=false;
                    break;
                }
             /*   else if (equip1.items!=equip2.items){
                    console.log("First items: ");console.log(equip1.items);
                    console.log("second items: ");console.log(equip2.items);
                }*/

            }
        }

        let res = true
        for (let i = 0; i < arr.length; i ++) {
            console.log("first arr is "+arr[i])
            res &= arr[i];
        }

        return res;

    }


    completeStep  = (step_id) => {{
        let currentStep = this.state.completedSteps;
        console.log("all steps are ");console.log(this.state.steps)
        console.log("currentstep is " +currentStep + "aka  "+ JSON.stringify(this.state.steps[currentStep-1]))
        console.log("equips is "+JSON.stringify(this.state.equipments[currentStep]))
        console.log(this.state.equipments)
        if (this.state.equipments[0]==null){
          this.state.equipments[0]=[]
        }
        console.log(this.state.equipments)
        //console.log("num equips is "+this.state.equipments[currentStep].length)
        if (this.state.equipments[currentStep]==null){
            ToastsStore.error("Step failed. Try again.")
            console.log("aaaa")
            return null;
        }
        if (!this.verifyStep(this.state.steps[currentStep].equipments,this.state.equipments[currentStep+1])){
            ToastsStore.error("Step failed. Try again.")
            console.log("no bueno")
            return null;
        }
        console.log("current step is "+currentStep + "steps.length is "+this.state.steps.length)
        if (currentStep+2>this.state.steps.length){
            ToastsStore.success("Lab completed!")
            this.completeLab()
            return
        }
        this.setState({completedSteps: this.state.completedSteps + 1},this.callback)
        console.log("completed")
        console.log("all equips is "+JSON.stringify(this.state.equipments))
    }};

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

    getBoundingXY(x,y,workspace_dm,source_dm)
    {
        const max_x = workspace_dm.getBoundingClientRect().width - source_dm.getBoundingClientRect().width;
        const max_y = workspace_dm.getBoundingClientRect().height - source_dm.getBoundingClientRect().height;
        x=x<0?0:x;
        y=y<0?0:y;
        x=x>max_x?max_x:x;
        y=y>max_y?max_y:y;

        return [x,y]
    }

    getDifference(original,after,value)
    {
        const difference = Math.abs(original-after)
        if(difference!==value)
            return value;
        else
            return difference;
    }
    adjust_interactive_element(ev,workspace,src_equip,target_equip){
        const src_id = "workspace"+workspace+"equip"+src_equip;
        const targ_id = "workspace"+workspace+"equip"+target_equip;
        const workspace_id="workspace"+workspace;
        console.log("workspace id " +workspace_id)
        const src = this.state.equipments[workspace][src_equip];
        const targ = this.state.equipments[workspace][target_equip];

        const offset = ev.dataTransfer.getData("text/offset").split(',');

        const src_element = document.getElementById(src_id);
        const targ_element = document.getElementById(targ_id);
        const workspace_element=document.getElementById(workspace_id)
        console.log("workspace leemtn is ")
        console.log(workspace_element)
        var src_x=(ev.clientX + parseInt(offset[0],10));
        var src_y=(ev.clientY + parseInt(offset[1],10));
        console.log("unverified original",[src_x,src_y])
        console.log(src_element,targ_element)

        const verify = this.getBoundingXY(src_x,src_y,workspace_element,src_element);
        src_x=verify[0];
        src_y=verify[1];

        var targ_x = targ.left;
        var targ_y = targ.top;

        if(Tool.prototype.isPrototypeOf(targ))
        {


            const src_height=src_element.getBoundingClientRect().height;
            const targ_height =targ_element.getBoundingClientRect().height-(src.size/3*2);

            //+src.size/2
            var src_pos = this.getBoundingXY(targ_x+30,targ_y-(src_height/2+5),workspace_element,src_element);

            // const difference=[this.getDifference(src_pos[0],src_x,src.size/2),this.getDifference(src_pos[1],src_y,0)];
            // if(difference[1]!==targ_height)
            // {
            //     alert("moving scale up")
            //     var targ_pos = this.getBoundingXY(src_x-difference[0],src_y+difference[1],workspace_element,targ_element);
            // }
            // else
            var targ_pos = [targ_x,targ_y]

            src.setInteracting(true);


        }
        else {

            src.setDegree(45);
            src.setInteracting(true);


            const width = src_element.getBoundingClientRect().width / 4;
            const height = src_element.getBoundingClientRect().height / 4;
            console.log("src rect", src_element.getBoundingClientRect())
            var src_pos = this.getBoundingXY(targ_x - width, targ_y - height, workspace_element, src_element);

            const difference = [this.getDifference(src_pos[0], src_x, width), this.getDifference(src_pos[1], src_y, height)];

            console.log("original ", [src_x, src_y], "new ", src_pos, " difference ", difference)

            var targ_pos = this.getBoundingXY(targ_x + difference[0], targ_y + difference[1], workspace_element, targ_element);


            //position moved back, meaning it went out of bounds
            // if(src_y===src_pos[1])
        }

        targ_x=targ_pos[0]
        targ_y=targ_pos[1]
        src_x=src_pos[0];
        src_y=src_pos[1];


        //src move up, no need to reposition target

        src_element.style.left=src_x+'px';
        src_element.style.top=src_y+'px';
        src.setLocation(src_x,src_y);

        targ_element.style.left=targ_x+'px';
        targ_element.style.top=targ_y+'px';
        targ.setLocation(targ_x,targ_y);
        // console.log("moving ",workspace_id,equip_id,source);
    }

    render(){

        if(!this.state.lab_loaded)
        {
            console.log("popualtign steps")
            this.populateSteps();
            this.makeSlide()

            return null;
        }
        if (this.state.redirectHome){
            return <Redirect exact to={{
                pathname: "/student_home",

            }}/>;
        }
        if (this.state.reRender){

        console.log("steps is "+JSON.stringify(this.state.steps))
        let x=this.state.completedSteps+1
        console.log("slides is "+(this.state.slide))
        console.log("x is "+x)
            console.log("FORCING, equips is" +this.state.equipments)
        let container= <Tab.Container id="steps" activeKey={x}>
            <Row>
                <Col style={{marginLeft:"4%",justifyContent:'center',alignItems:"center",height: '80vh',overflowY:"scroll",backgroundColor:"#65bc93"}}  lg={{span:1}} className={"darkerBack"}>
                    {/*{this.slides()}*/}
                    {/*<Slides slide_num={this.state.steps.length} addChild={this.handleAddChild}/>*/}
                    {this.state.slide}
                </Col>
                <Col style={{justifyContent:'center',alignItems:"center",height: '80vh',backgroundColor:"#50c8cf"}}  lg={{span:3}} >
                    {this.instructionPane()}
                </Col>

                <Col lg={{span:7}} className="darkerBack"  >
                    {this.workspacePane()}


                </Col>

            </Row> <ToastsContainer store={ToastsStore}/>
        </Tab.Container>;

        return(
            <div >

                {this.banner()}

                {this.toolbar()}

                {container}
            </div>
        )
    }
        else{

            console.log("steps is "+JSON.stringify(this.state.steps))
            let x=this.state.completedSteps+1
            console.log("slides is "+(this.state.slide))
            console.log("x is "+x)
            console.log("not forcing it this time!"+this.state.equipments)

            let container= <Tab.Container id="steps" defaultActiveKey={x}>
                <Row>
                    <Col style={{marginLeft:"4%",justifyContent:'center',alignItems:"center",height: '80vh',overflowY:"scroll",backgroundColor:"#65bc93"}}  lg={{span:1}} className={"darkerBack"}>
                        {/*{this.slides()}*/}
                        {/*<Slides slide_num={this.state.steps.length} addChild={this.handleAddChild}/>*/}
                        {this.state.slide}
                    </Col>
                    <Col style={{justifyContent:'center',alignItems:"center",height: '80vh',backgroundColor:"#388a9c"}}  lg={{span:3}} >
                        {this.instructionPane()}
                    </Col>

                    <Col lg={{span:7}} style={{backgroundColor:"#67a8a1"}} >
                        {this.workspacePane()}


                    </Col>

                </Row> <ToastsContainer store={ToastsStore}/>
            </Tab.Container>;

            return(
                <div >

                    {this.banner()}

                    {this.toolbar()}

                    {container}
                </div>
            )
        }
        }
    }





export default DoLab