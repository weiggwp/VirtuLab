import React, {Component} from 'react';
import icon from "../Images/v.jpg";

import '../stylesheets/banner.css';
import '../stylesheets/student_lab.css';
import '../stylesheets/create_lab.css';
import {PhotoshopPicker, SketchPicker} from 'react-color'
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
import deepCloneWithType, {floatEqual, sortArrayByAttr} from "../clone"

class create_lab extends React.Component {
    constructor(props) {
        super(props);

        this.steps = [new Step(0)];
        this.equipmentSet = new EquipmentSet();
        this.target = null;
        this.ref = React.createRef();
        this.colorRules={};
        this.rules = {};

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
            selectedStep:-1,


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
        this.adjust_interactive_element=this.adjust_interactive_element.bind(this);
        this.hidePopOver=this.hidePopOver.bind(this);
        this.update=this.update.bind(this);
        // this.addColorChangeRule = this.addColorChangeRule.bind(this);
        // this.checkColorChangeRule = this.checkColorChangeRule.bind(this);
    }


    // addColorChangeRule(eq,color){
    //
    //     const items = sortArrayByAttr(eq.items);
    //
    //     const sorted_names = items.map((item) =>item.name);
    //     const amounts = items.map((item) =>item.amount);
    //
    //     this.rules[sorted_names] = {"amounts":amounts,"color":color};
    // }

    // checkColorChangeRule(eq){
    //     const items = sortArrayByAttr(eq.items);
    //     const sorted_names = items.map((item) =>item.name);
    //     const amounts = items.map((item) =>item.amount);
    //     console.log("items",items,
    //         "this.rules",this.rules[sorted_names]);
    //     const marchingRule = this.rules[sorted_names];
    //     if(marchingRule){
    //         console.log("rule found","amounts",amounts, "sorted_names", sorted_names );
    //         const rule_amounts = marchingRule.amounts;
    //
    //         if(amounts.length !== rule_amounts.length ){
    //             return false;
    //         }
    //
    //         for(let i=0;i<amounts.length; i++ ){
    //             if(! floatEqual(amounts[i], rule_amounts[i], rule_amounts[i]*.1 )){
    //                 return false;
    //             }
    //         }
    //         return this.rules[sorted_names]["color"];
    //     }
    //     return false;
    // }
    populateStepEquipment(equipList)
    {

        let equip;
        var result =[];
        const solutions=['General','Acids','Indicators','Bases','Stock Solutions'];
        const glassware=['Titration Flasks','Graduated Cylinders',"Beakers","Volumetric Flasks","Pipettes"]



        for (var i = 0; i < equipList.length; i++) {
            var current = equipList[i];
            console.log("current",current)

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

    populateSteps()
    {

       // console.log(this.props.location.state.equipments)
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
        this.handleLabSave()
        ToastsStore.warning("auto saved lab progress");
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
            selectedStep: workspace_id,
            viewInfo:true
        }, () => {
            // console.log(this.state.currentEquipment)
            // console.log(this.state.viewInfo)

        })
        // this.setViewInfo();
        this.forceUpdate()
    }

    update=()=>
    {
        this.forceUpdate()
    }

    setRestart = () => {

        // console.log(this.state.equipments)
        const temp = this.state.steps;
        this.state.equipments[this.state.currentStep]=[];
        this.forceUpdate();

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

        this.setState({
            steps: this.state.steps
        })

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

            stepsDTO: this.state.steps,
            equipments: this.equipmentSet.getJSONList(),
            // lastModified: new Date(),
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        console.log("Sending equipment is " + this.state.equipments);
        axios.post(GLOBALS.BASE_URL + 'save_lab', lab, axiosConfig)
            .then((response) => {

                this.setState({save_success: true});
                // console.log("id is "+response.data);
                if(this.state.lab_id===0)  //only if not set
                    this.setState({lab_id:response.data});
                ToastsStore.success("lab saved successfully")


            })
            .catch((error) => {
                    this.setState({
                        errors: 'Saving error',
                    });
                    ToastsStore.error("Error saving lab")
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

            <EquipmentList step={0} update={this.update} set={this.equipmentSet.getEquipments()} handleAddEquipment={this.handleAddEquipment}/>

            {this.setupInstruction(0,"This is the setup stage. " +

            "Click on equipments you would like to disable for the duration of the lab (click again to unselect). "
            + "For convenience, you may also click on the checkmarks next to equipment types to enable/disable a whole category of equipments."
                +"Right click on a equipment to remove liquids, change fill color, view info, delete equipment ") }</Tab.Pane>);

        for (let i = 1; i <= this.state.step_num; i += 1) {
            // instructions.push(<Tab.Pane eventKey={i}> {this.state.steps[i].instruction} </Tab.Pane>);
            instructions.push(<Tab.Pane eventKey={i}>

                {this.getEquipmentTab(i)}
                {/*<span>instruction for step {i} </span>*/}
                {/*{this.instruction(i)}*/}


            </Tab.Pane>);
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
        if(this.state.viewInfo===true && i===this.state.selectedStep)
            return  <EquipmentInfo getEquipments={this.setViewInfo} equipment={this.state.currentEquipment}/>
        else
            return  <div>
                <EquipmentList style={{height:"8vh"}} set={this.equipmentSet.getEquipments()} step={i} handleAddEquipment={this.handleAddEquipment}/>

                <span style={{fontFamily:"monospace",fontSize:14}}>Instruction for step {i} </span>
                {this.instruction(i)}
            </div>
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
                this.forceUpdate()
            }
            else{
                source.interact(target);
                this.forceUpdate()
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
        if(this.state.importStep<1 || this.state.importStep>this.state.step_num)
        {
            ToastsStore.error("Cannot import from an invalid step")
            return
        }
        if(parseInt(this.state.importStep)===step)
        {
            ToastsStore.error("Cannot import from current step")
            return
        }



        const temp = deepCloneWithType(this.state.equipments);

        //right now temp is filled with image sources of equipments
        temp[step]=temp[this.state.importStep];
        this.setState(
            {equipments:temp}
        )
        if(temp[step].length===0)
        {
            ToastsStore.warning("Imported from an empty step")

        }
        else
        {
            ToastsStore.success("Imported step ",this.state.importStep)
        }
    }
    

    handleAction(source, action,target,input){

        source[action](target,parseFloat(input));

        // let color = this.checkColorChangeRule(target);
        // console.log("color",color);
        // alert(color);
        // if (color){
        //     target.color = color;
        // }
        this.forceUpdate();
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
            onHide={() => this.onHide(source)}
            style={{width:400}}
        >
            <Popover id="popover-contained" >
                <Popover.Title >
                    <div className={"col1"}>
                        <strong>Action</strong>
                    </div>
                    <div className={"col2"}>
                        <a className="close" onClick={()=>this.onHide(source)}/>
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
                    <div
                        style={{height:"100%"}}
                        id={"workspace"+i}
                    >

                        {equipments.map((equipment,index) => (
                        <Draggable_equipment wkspace_id={i} equip_id={index}
                                             interation_handler= {this.interaction_handler}
                                             viewInfo={this.getInfo}
                                             canInteract = {this.canInteract}
                                             handle_equip_delete={this.handle_equip_delete}
                                             equipment={equipment}
                                             role="instructor"
                                             move_element={this.move_element}
                                             adjust={this.adjust_interactive_element}
                                             width={200} height={200}
                                             hide={this.hidePopOver}
                        />

                                             // addColorChangeRule={this.addColorChangeRule}




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

    handleDelChild = (curStep) => {

        /* should probably toast a error msg, step 0 can't be removed */
        if (curStep === 0) {
            return
        }
        curStep = parseInt(curStep)
        let newSteps= []
        let steps = this.state.steps
        newSteps[0] = steps[0]
        let newEquips=[[]]


        if(this.state.step_num<2)
        {
            //do nothing

            this.setState({
                steps: newSteps,
                step_num: 0,
                equipments:newEquips
            })
        }
        else
        {
            let equips = this.state.equipments
            for (let i = 1; i < equips.length; i ++) {
                if (i === curStep)
                    continue;
                else
                    newEquips.push(equips[i])
            }

            for (let i = 1; i < steps.length; i ++) {
                steps[i].setEquipments(this.state.equipments[i])
                if (i === curStep)
                    continue;
                else if(i > curStep) {
                    steps[i].setStepNum(i - 1)
                    newSteps.push(steps[i])
                } else {
                    newSteps.push(steps[i])
                }
            }


            this.setState({
                steps: newSteps,
                step_num: this.state.step_num - 1,
                equipments:newEquips
            })
        }



    }

    handleAddChild = () => {
        // adding a new step
        this.state.steps.push(new Step(this.state.steps.length,""));


        var temp = this.state.equipments;
        //right now temp is filled with image sources of equipments
        temp[this.state.step_num+1]=deepCloneWithType(temp[this.state.step_num]);

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
                    // console.log(this.state.equipments);
                }
            )
        }
    };


    selectStep(i){
        this.setState({
                currentStep:i,



            },

        );


    }
    render(){

        if(!this.state.lab_loaded)
        {
            this.populateSteps();
            return null;
        }

        let size = this.state.steps.length - 1

        return(
            <div >

                {this.banner()}

                {this.toolbar()}

                <Tab.Container id="steps" defaultActiveKey="0">
                    <Row>
                        <Col style={{marginLeft:"4%",justifyContent:'center',alignItems:"center",height: '80vh',overflowY:"scroll",backgroundColor:"#136389"}}  lg={{span:1}} >
                            {/*{this.slides()}*/}
                            {/*<Slides slide_num={this.state.steps.length} addChild={this.handleAddChild}/>*/}
                            <Slides
                                    slide_num={this.state.step_num}
                                    addChild={this.handleAddChild}
                                    onSelect={this.selectStep}
                                    delChild={this.handleDelChild}
                                    hidden={false}
                            />


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
        // console.log("moving ",workspace_id,equip_id,source);
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

            // const difference=[this.getDifference(src_pos[0],src_x,src.size/2),this.getDifference(src_pos[1],src_y,0)];
            // if(difference[1]!==targ_height)
            // {
            //     alert("moving scale up")
            //     var targ_pos = this.getBoundingXY(src_x-difference[0],src_y+difference[1],workspace_element,targ_element);
            // }
            // else
            const new_src_x = src_pos[0];
            const new_src_y = src_pos[1];
            // console.log("src_pos_x new",new_src_x,"src_pos_y new ",new_src_y);
            const new_targ_x = new_src_x+ x_diff -targ_diff_center_x;
            const new_targ_y = new_src_y+y_diff - targ_diff_center_y;
            // console.log("src_pos_x new",new_targ_x,"src_pos_y new ",new_targ_y);


            var targ_pos = [new_targ_x,new_targ_y];

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

}


export default create_lab;