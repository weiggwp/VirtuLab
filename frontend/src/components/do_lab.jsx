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
import {EquipmentInfo} from "./EquipmentInfo";


class DoLab extends React.Component {
    constructor(props) {
        super(props);

        this.steps = [];
        this.equipmentSet = new EquipmentSet();
        this.target = null;
        this.ref = React.createRef();
        this.interaction_map = {};

        this.state = {
            showPopover: false,
            redirectHome: false,
            restart:false,
            steps : [],
            step_num: 0,
            completedSteps:0,
            lab_id: this.props.lab_id,
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
            completed:false,


            curStep: 0,
            lab: {}

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
        this.setState({currentStep:i})}



    componentDidMount() {
        this.handleGetLab();
    }


    /* function call to combine previous step equips and cur step equips */
    combine(prevStepEquips, curStepEquips) {
        // there are only 10 things allowed on the workspace, so this can get tricky.
        // we can keep the all the previousEquips, and only add the equips that are not alrdy in previous steps
        // TODO:

    }

    /* function call on finishing the lab */
    complete() {
        // TODO: axios call to update completion.

    }

    /* */



    /* function call to filter the equipments selected with 0, 0... they should not be on workspace */
    filerInitalEquips(equips){
        let filter = []
        for (let i = 0; i < equips.length; i ++) {
            let x = equips[i].x
            let y = equips[i].y
            if (x === 0 && y === 0) {
                filter.push(equips[i])
            }
        }
        return filter;
    }

    getInfo(e,data)
    {
    //    alert("getting info, workspace id is ")
        const workspace_id = data.workspace_id;
        const eq_id = parseInt(data.equip_id);
      //  alert("getting info, workspace id is " + workspace_id)

        const source = this.state.equipments[workspace_id][eq_id];

        this.setState({
            currentEquipment: source,
            selectedStep: workspace_id,
            viewInfo:true
        }, () => {


        })
        // this.setViewInfo();
        this.forceUpdate()
    }

    setViewInfo=()=>{
        this.setState({
            viewInfo: !this.state.viewInfo
        })
    }
    populateStepEquipment(equipList)
    {

        let equip;
        var result =[];
        const solutions=['General','Acids','Indicators','Bases','Stock Solutions'];
        const glassware=['Titration Flasks','Graduated Cylinders',"Beakers","Volumetric Flasks","Pipettes"]


        for (var i = 0; i < equipList.length; i++) {
            var current = equipList[i];
            // console.log("current is");
            // console.log(current)


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
    {    
        //if not new lab, load old lab
        if(this.props.location.state!==undefined){

            //get steps from prop
            var step_list = this.props.location.state.steps;
            // console.log("steplist is");
            // console.log(step_list)
            step_list.sort(this.compare)
            // console.log("steplist is");
            // console.log(step_list)
            //opening a previously saved lab
            if (step_list !== undefined)
            {
                for (var i = 1; i <step_list.length ; i++) {
                    this.state.steps.push(step_list[i]);
                    // console.log("pushed");
                    // console.log(step_list[i])
                    this.state.equipments[i]=this.populateStepEquipment(step_list[i-1].equipments);


                }

            }
            this.populateEquipmentSetup();



            this.setState(
                {
                    step_num: step_list.length - 1,
                    lab_id: this.props.location.state.id,
                    lab_title:this.props.location.state.name,
                    lab_loaded: true,
                }, () => {
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

        let i=0;
        for (i=0; i<this.state.steps.length; i++){
            this.state.steps[i].setEquipments(this.state.equipments[i-1])
        }
      /*  this.state.steps.map((step,index)=>(

            step.setEquipments(this.state.equipments[count++])

        ));*/

    }
    setRedirectHome = () => {
        // console.log("props is ");
        // console.log(this.props)
        if ((!this.state.completed)&&!(this.props.location.state.isComplete)&&!window.confirm("Are you sure you would like to leave? Progess will not be saved.")){
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

        let stepNum=this.state.completedSteps+1;
        if (stepNum==1){
            this.state.equipments[1]=[]
            this.setState({testInt:12}) // DONT DELETE, THE CODE DOESNT WORK WITHOUT IT IDK
            this.render()
            return null
        }
        this.state.equipments[stepNum]=deepCloneWithType(this.state.currentStepCopy)
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

    /* call this function to get the lab */
    handleGetLab = () => {
        // alert("saving " +this.state.lab_id)
        const lab = {
            // labID: this.state.lab_id
            labID: this.props.location.state.labID,
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        axios.post(GLOBALS.BASE_URL + 'get_lab', lab, axiosConfig)
            .then((response) => {
                // TODO: pull the lab
                let theLab = response.data

                this.setState({
                    lab: theLab
                })

            })
            .catch((error) => {
                    this.setState({
                        errors: 'Error getting the lab',
                    });
                }
            );
    };

    toolbar()
    {
        {
            // console.log("props is ");
            // console.log(this.props.location.state.lab_name)
            return (
                <Navbar style={{backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",marginLeft: 40, marginRight: 40, marginTop: 10, marginBottom: 10}}
                        className={"justify-content-between bar"}>
                    <Nav>
                        <font color = "white">{this.props.location.state.lab_name}</font>

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
        for (let i = 1; i <= this.state.step_num; i += 1) {
            // instructions.push(<Tab.Pane eventKey={i}> {this.state.steps[i].instruction} </Tab.Pane>);
            instructions.push(<Tab.Pane eventKey={i}>
                {this.getEquipmentTab(i)}

            </Tab.Pane>);
               {/* <EquipmentList set={this.equipmentSet.getEquipments()} step={i+1} handleAddEquipment={this.handleAddEquipment}/>*/}

        }


        return(
            <Tab.Content>

                {instructions}
            </Tab.Content>
        )

    }

    getEquipmentTab(i)
    {
        //alert("i is " +i + " selcted step is "+this.state.selectedStep + " viewinfo is "+this.state.viewInfo)
        if(this.state.viewInfo===true && i===this.state.selectedStep) {
            return <EquipmentInfo getEquipments={this.setViewInfo} equipment={this.state.currentEquipment}/>
        }
        else
            return  <div>
                <EquipmentList style={{height:"8vh"}} set={this.equipmentSet.getEquipments()} step={i+1} handleAddEquipment={this.handleAddEquipment}/>
                {this.setupInstruction(i,this.state.steps[i-1].instruction)}
        </div>


    }

    popOff(workspace_id, eq_id) {
        let old_tartget = this.interaction_map[workspace_id + "," + eq_id];
        if (old_tartget[0].name === "Scale") {
            this.state.equipments[workspace_id][old_tartget[2]].removeItems();
            // this.state.equipments[workspace_id][old_tartget[2]].value = 0;
            // this.state.equipments[workspace_id][old_tartget[2]].items = [];
            this.state.equipments[workspace_id][old_tartget[2]].interacting = false;

            delete  this.interaction_map[[workspace_id + "," + eq_id]];
            this.forceUpdate();

        }
    }

    canInteract(workspace_id1, eq_id1, workspace_id2, eq_id2){
        const eq1 = this.state.equipments[workspace_id1][eq_id1];
        const eq2 = this.state.equipments[workspace_id2][eq_id2];
        return eq1.canInteract(eq2);
    }

    interaction_handler(target_ev, workspace_id1, eq_id1, workspace_id2, eq_id2) {
        const source = this.state.equipments[workspace_id1][eq_id1];
        const target = this.state.equipments[workspace_id2][eq_id2];
        const interactable = source.canInteract(target);

        if (interactable) {
            // console.log("interactable",this.state.equipments);

            this.eq1 = source;
            this.eq2 = target;
            let actions = source.getActions(target);

            //dec 11
            if (target.name === "Scale") {
                this.interaction_map[workspace_id1 + "," + eq_id1] = [target, workspace_id2, eq_id2];
            }

            this.target = target_ev;
            if (actions) {
                this.setState({showPopover: true});
            } else {
                source.interact(target);
                target.items = [source];
            }

            this.forceUpdate()
        }


    }

    handle_equip_delete(e,data){

        const workspace_id = data.workspace_id;
        const eq_id = parseInt(data.equip_id);

        let temp = this.state.equipments;
        // delete temp[workspace_id][eq_id];

        const removed = temp[workspace_id].splice(eq_id,1);

        this.setState({equipments: temp});
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




        const equip_id = ev.dataTransfer.getData('text/equip_id');

        const source = this.state.equipments[workspace_id][equip_id];
        source.setLocation(x,y);
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

        const data = new FormData(e.target);
    }
    handleInputChange=(e)=>{
        this.setState({input: e},()=>{
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


    
    handleAction(source, action,target,input){


        source[action](target,parseFloat(input));
        this.setState({input:1,showPopover:false})
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
        let incRate =.2
        if (target!==undefined)
         incRate =target.capacity/100;
        let capacity=100;
        if (target!==undefined)
            capacity=target.capacity

        return(

            <Overlay
                show={this.state.showPopover}
                target={this.target}
                placement="bottom"
                container={this.ref.current}
                containerPadding={20}
                rootClose={true}
                //onHide={() => this.onHide(source)}
                style={{width:900}}
            >
                <Popover id="popover-contained" >
                    <Popover.Title  style={{width:150}}>
                        <div className={"col1"}>
                            <strong>Action</strong>
                        </div>
                        <div className={"col2"}>
                            <a className="close" onClick={()=>this.onHide(source)}/>
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
        for (let i = 1; i <= this.state.step_num; i += 1) {
            const equipments = this.state.equipments[i];
            if (equipments==undefined)break;
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
                                                 viewInfo={this.getInfo}
                                                 canInteract = {this.canInteract}
                                                 interaction_map={this.interaction_map}
                                                 handle_equip_delete={this.handle_equip_delete}
                                                 equipment={equipment}
                                                 role="student"
                                                 move_element={this.move_element}
                                                 adjust={this.adjust_interactive_element}
                                                 width={200} height={200}
                                                 hide={this.hidePopOver}
                                                interaction_map={this.interaction_map}
                                                popOff={this.popOff}
                                                removeContainingElements = {this.removeContainingElements}
                            // addColorChangeRule={this.addColorChangeRule}
                            />


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
        step=step-1;
        // var image = equipment;

        const current = this.state.equipments;
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
            current[step].push(this.createNewEquipment(equipment));
            //            <Draggable_equipment image={image} x={500} y={100} width={this.state.equipments.length*100} height={this.state.equipments.length*100}/>

            this.setState(
                {
                    equipments:current
                }, () => {
                }
            )
        }
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
        this.setState({reRender: false},this.callbackSecondRender)
    }
    callbackSecondRender(){
         this.render()
    }
    callback(){
        var currslide =
            <Slides id="slides"steps={this.state.steps}onSelect={this.selectStep}
                    completedSteps={this.state.completedSteps} slide_num={this.state.step_num} addChild={this.handleAddChild}
                    role={"student"}/>;
        this.setState({slide:currslide});
        ToastsStore.success("Step completed!")

        let cloneCopy;
        cloneCopy=deepCloneWithType(this.state.equipments[this.state.completedSteps+1]);
        this.setState({reRender: true,currentStepCopy:cloneCopy},this.callbackFirstRender)

    }


    arraysEqual(arr1,arr2){
        if (arr1.length!=arr2.length)return false;



        let arr = []
        for (let i = 0; i < arr1.length; i ++) {
            arr.push(false)
        }


        for (let i=0; i<arr1.length; i++){
            let item1 = arr1[i]
            for (let j=0; j<arr1.length; j++) {
                let item2 = arr2[j]
                if (item1.name == item2.name && item1.weight == item2.weight && this.verifyAmounts(item1,item2)) {
                    arr[i]=true;
                }
            }
        }


        let res = true
        for (let i = 0; i < arr.length; i ++) {
            // console.log("first arr is "+arr[i])
            res &= arr[i];
        }

        return res;


        return true;
    }

    verifyAmounts(eq1, eq2){
        let grace = Math.min(eq2.capacity/10,5);
        // console.log("comparing")
        // console.log(eq1)
        // console.log(eq2)
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


    sendFailedStep(){
         if (this.props.isComplete)return
        let labs =[];
        const lab = {
            labID:this.props.location.state.labID
        }
        labs[0]=lab
        console.log("course id is "+this.props.location.state.courseID)
        console.log(this.state)
        const course= {
            email:this.props.email,
            courseCode: this.props.location.state.courseID,
            labID:this.props.location.state.labID,
            stepID:this.state.steps[this.state.completedSteps].stepID,
        };
        console.log("curr stpe is ");console.log(this.state.steps);
        console.log("Steps completed is "+this.state.completedSteps)
        console.log("course is ");
        console.log(course)
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };

        var studentList=[];
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'set_tries', course, axiosConfig)
            .then((response) => {

            })
            .catch((error) => {

            });

    }
    completeStep  = (step_id) => {{
        this.sendFailedStep()
        let currentStep = this.state.completedSteps;
        
        if (this.state.equipments[0]==null){
          this.state.equipments[0]=[]
        }
        if (this.state.equipments[currentStep]==null){
            ToastsStore.error("Step failed. Try again.")
            return null;
        }
        if (!this.verifyStep(this.state.steps[currentStep].equipments,this.state.equipments[currentStep+1])){
            ToastsStore.error("Step failed. Try again.")
            this.sendFailedStep();
            return null;
        }
        if (currentStep+2>this.state.steps.length){
            ToastsStore.success("Lab completed!")
            this.completeLab()
            return
        }
        this.setState({completedSteps: this.state.completedSteps + 1},this.callback)
    }};

    completeLab(){

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

                this.setState({completed:true})
            })
            .catch((error) => {

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

        const src = this.state.equipments[workspace][src_equip];
        const targ = this.state.equipments[workspace][target_equip];

        const offset = ev.dataTransfer.getData("text/offset").split(',');

        const src_element = document.getElementById(src_id);
        const targ_element = document.getElementById(targ_id);
        const workspace_element=document.getElementById(workspace_id)

        var src_x=(ev.clientX + parseInt(offset[0],10));
        var src_y=(ev.clientY + parseInt(offset[1],10));


        const verify = this.getBoundingXY(src_x,src_y,workspace_element,src_element);
        src_x=verify[0];
        src_y=verify[1];

        var targ_x = targ.left;
        var targ_y = targ.top;



        if(Tool.prototype.isPrototypeOf(targ))
        {

            const tartg_width = targ_element.getBoundingClientRect().width;
            const tartg_height = targ_element.getBoundingClientRect().height;
            // targ x and targ y is where we want the botton center of src to be

            let targ_diff_center_x = 0;
            let targ_diff_center_y = 0;

            if(targ.name==="Scale"){
                targ_diff_center_x  = tartg_width * .45;
                targ_diff_center_y  = tartg_height * .35;


            }
            else if (targ.name==="Bunsen Burner"){
                targ_diff_center_x = tartg_width * .5;
                targ_diff_center_y = tartg_height * .1;

            }

            const targ_center_x = targ_x + targ_diff_center_x;
            const targ_center_y = targ_y + targ_diff_center_y;

            const src_height = src_element.getBoundingClientRect().height;
            const src_width = src_element.getBoundingClientRect().width;


            const x_diff = (src_width * .5);
            const y_diff = (src_height * .9);

            // var src_pos = this.getBoundingXY(targ_x+30,targ_y-(src_height/2+5),workspace_element,src_element);
            var src_pos = this.getBoundingXY(targ_center_x-x_diff,targ_center_y-y_diff, workspace_element,src_element);

            const new_src_x = src_pos[0];
            const new_src_y = src_pos[1];
            const new_targ_x = new_src_x+ x_diff -targ_diff_center_x;
            const new_targ_y = new_src_y+y_diff - targ_diff_center_y;


            var targ_pos = [new_targ_x,new_targ_y];

            src.setInteracting(true);


        }
        else {

            src.setDegree(45);
            src.setInteracting(true);


            const width = src_element.getBoundingClientRect().width / 4;
            const height = src_element.getBoundingClientRect().height / 4;
            var src_pos = this.getBoundingXY(targ_x - width, targ_y - height, workspace_element, src_element);

            const difference = [this.getDifference(src_pos[0], src_x, width), this.getDifference(src_pos[1], src_y, height)];


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
    }
    render(){

        if(!this.state.lab_loaded)
        {
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

        let x=this.state.completedSteps+1
        let container= <Tab.Container id="steps" activeKey={x}>
            <Row>
                <Col style={{marginLeft:"4%",justifyContent:'center',alignItems:"center",height: '80vh',overflowY:"scroll",backgroundColor:"#136389"}}  lg={{span:1}} >
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
        else{

            let x=this.state.completedSteps+1

            let container= <Tab.Container id="steps" defaultActiveKey={x}>
                <Row>
                    <Col style={{marginLeft:"4%",justifyContent:'center',alignItems:"center",height: '80vh',overflowY:"scroll",backgroundColor:"#136389"}}  lg={{span:1}} >
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