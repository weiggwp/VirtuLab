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
            equipments:[[]],
            input:0,
            popoverWarning:"",
            slide:undefined,


            curStep: 0,
            lab: {}

        };



        this.handleAddEquipment = this.handleAddEquipment.bind(this);
        this.interaction_handler = this.interaction_handler.bind(this);
        this.handle_equip_delete = this.handle_equip_delete.bind(this);
        this.canInteract = this.canInteract.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


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


    /* function call to verify if current step is correct */
    verifyStep(studentEquips, stepEquips) {
        let m = stepEquips.length;
        let n = studentEquips.length;

        let arr = []
        for (let i = 0; i < m; i ++) {
            arr.push(false)
        }

        for (let i = 0; i < m; i ++) {
            let equip1 = stepEquips[i]
            for (let j = 0; j < n; j ++) {
                let equip2 = studentEquips[j]
                /* check for same type equipment and same volume, amount */
                if (equip1.name === equip2.name &&
                    equip1.amount === equip2.amount) {
                    arr[i] = true
                }
            }
        }

        let res = true
        for (let i = 0; i < arr.length; i ++) {
            res &= arr[i];
        }
        return res;

    }

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

    populateEquipmentSetup()
    {
        console.log("populating,s tate is "+JSON.stringify(this.props.location.state))
        var equipList = this.props.location.state.equipments;
        if (equipList !== undefined&&equipList!=null)//opening a previously saved lab
        {
            console.log("equplist is "+JSON.stringify(equipList))
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
        //if not new lab, load old lab
        if(this.props.location.state!==undefined){

            //get steps from prop
            var step_list = this.props.location.state.steps;
            console.log("propstepsss    s is "+JSON.stringify(this.props.location.state.steps))
            console.log("steplist is now "+JSON.stringify(this.state.steps))
            //opening a previously saved lab
            if (step_list !== undefined)
            {
                for (var i = 1; i <step_list.length ; i++) {
                    console.log("pushing instruction "+i+"="+JSON.stringify( step_list[i].instruction))
                    this.state.steps.push(new Step(i+1, step_list[i].instruction));
                    console.log("steplist is now "+JSON.stringify(this.state.steps))
                    this.state.equipments[i]=[];

                }

            }
            console.log("steplist is now "+JSON.stringify(this.state.steps))
            console.log("populationg equipsetup!")
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
        this.setState({
            redirectHome: true
        })
    };

    setRestart = (step_id) => {

        const temp = this.state.steps;
        temp[step_id].workspace= new Workspace();
        this.setState({
            restart: true,      //should probably just be restarting a single step
            steps: temp,
            equipments:{},

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

    /* call this function to get the lab */
    handleGetLab = () => {
        // alert("saving " +this.state.lab_id)
        const lab = {
            labID: this.state.lab_id
            // labID: 871,
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
                console.log("The lab is: ")
                let theLab = response.data
                console.log(lab)

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
                            <Link to="/create_lab">
                                <Button onClick={this.setRestart} style={{backgroundColor: "black"}}>Restart</Button>
                            </Link>
                        </OverlayTrigger>


                        {/*<Image onClick={this.finishSelectEquipment} className={"buttons"} src={"https://icon-library.net/images/finished-icon/finished-icon-21.jpg"} />*/}


                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Trash selected item
                                </Tooltip>
                            }
                        >
                            <Image className={"buttons"} src={"https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png"} />
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
                                    Exit. Remember to save your edits.
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


    instruction(index)
    {
        console.log("index is "+index)
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

    addInstruction(){

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

                instruction for step {i} {this.instruction(i)}</Tab.Pane>);
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
        console.log(e);

        const data = new FormData(e.target);
        console.log(data);
    }
    handleInputChange(e){
        this.setState({input: e.target.value},);

    }

    setPopoverWarningMsg(msg){

        this.setState({popoverWarning:msg},()=>(alert(msg)));
    };

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
                    buttonList.push(<Button variant="primary" size={'sm'} onClick={()=>source[action](target,this.state.input, )}>{action}</Button>)
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
        //workspaces.push(<Tab.Pane eventKey={0}> workspace for step {0} </Tab.Pane>);
        console.log("equips is "+JSON.stringify(this.state.equipments))
        for (let i = 1; i <= this.state.step_num; i += 1) {
            const equipments = this.state.equipments[i-1];
            if (equipments==undefined)break;
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
                                                 interation_handler= {this.interaction_handler}
                                                 canInteract = {this.canInteract}
                                                 handle_equip_delete={this.handle_equip_delete}
                                                 equipment={equipment}
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
        alert(equipment.name+" "+equipment.disabled)


    };

    handleAddEquipment= (step,equipment) =>
    {
        if(step===0)
        {
            this.forceUpdate();
            return
        }
        step=step-2;
        // var image = equipment;

        const current = this.state.equipments;
        console.log("current is "+JSON.stringify(current )+"step is "+JSON.stringify(step))
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
    };
     makeSlide(){
        var currslide =
            <Slides id="slides"steps={this.state.steps}
                    completedSteps={this.state.completedSteps} slide_num={this.state.step_num} addChild={this.handleAddChild}
                            role={"student"}/>;
        this.setState({slide:currslide});
    }
    callback(){
         console.log("called back!")
        var currslide =
            <Slides id="slides"steps={this.state.steps}
                    completedSteps={this.state.completedSteps} slide_num={this.state.step_num} addChild={this.handleAddChild}
                    role={"student"}/>;
        this.setState({slide:currslide});
        ToastsStore.success("Step completed!")
    }
    completeStep  = (step_id) => {{
        let currentStep = this.state.completedSteps+1;
        console.log("currentstep is " +currentStep + "len is "+ this.state.steps.length
        +"equips is "+JSON.stringify(this.state.equipments)+ "with length "+this.state.equipments.length)

        //console.log("num equips is "+this.state.equipments[currentStep].length)
        if (this.state.equipments[currentStep-1].length<2){
            ToastsStore.error("Step failed. Try again.")
            return null;
        }
        if (currentStep+1>this.state.steps.length){
            ToastsStore.success("Lab completed!")
            this.completeLab()
            return
        }
        this.setState({completedSteps: this.state.completedSteps + 1},this.callback)


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
        alert("courselab is "+JSON.stringify(courselab))
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

    render(){

        if(!this.state.lab_loaded)
        {
            console.log("popualtign steps")
            this.populateSteps();
            this.makeSlide()

            return null;
        }
        console.log("steps is "+JSON.stringify(this.state.steps))

        return(
            <div >

                {this.banner()}

                {this.toolbar()}

                <Tab.Container id="steps" defaultActiveKey="0">
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


export default DoLab