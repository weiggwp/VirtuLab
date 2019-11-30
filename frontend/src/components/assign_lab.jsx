import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import icon from "../Images/v.jpg";
import {Button, Col, Container, FormControl, FormGroup, Image, Nav, Navbar, Row} from "react-bootstrap";
import '../stylesheets/account_settings.css';
import {Droppable_course} from './droppable_course.jsx'
import axios from "axios";
import GLOBALS from "../Globals";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {ToastsContainer, ToastsStore} from 'react-toasts';
export class assign_lab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instructor: props.instructor,
            due_date: new Date(),
            course_code: '',
            redirect: false,
            errors: '',
            lab_id:0,
            lab_loaded:false,
            loading_course:true,
            classes:[],
            selected_course_name:""
        };
    }
    updateClasses(){
        const user = {
            email: this.props.email
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        var classArr=[];
        var classArray=[];

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_courses', user, axiosConfig)
            .then((response) => {

                console.log(JSON.stringify(response))


                for (let i=0; i<response.data.length; i++){
                    classArr[i]=response.data[i]

                }
                var classArray=[];

                for (let i=0; i<response.data.length; i++){
                    classArray[i]={classname:response.data[i].course_name,classID:response.data[i].course_id,
                        clicked:false,labs:response.data[i].labDTOS,accessCode:response.data[i].code};

                       console.log("response is " +JSON.stringify(response.data[i]))
                }
                this.setState({classes:classArray,loading_course:false});
            })
            .catch((error) => {

                }
            );
    }
    loadLab(){
        //  alert(this.props.location.state);
        if(this.props.location.state!==undefined)
        {


            this.setState(
                {

                    lab_id: this.props.location.state.id,
                    lab_loaded: true,
                    classes: this.props.location.state.courses
                }, () => {
                    console.log(this.state.lab_id);

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
    handleFieldChange = (e, field) => {
        this.setState({[field]: e.target.value});
    };
    handleAddClass= (e) =>{
        e.preventDefault();
        if (this.state.selected_course_name.value==undefined){
            ToastsStore.error("Select a course.")
            return null;
        }

        for (let i=0; i<this.state.classes.length; i++){
            console.log("classname is " +this.state.classes[i].classname+  " current is "+this.state.selected_course_name.value )
            if (this.state.classes[i].classname==this.state.selected_course_name.value) {
                console.log("copying "+JSON.stringify(this.state.classes[i]))
                this.state.course_code=this.state.classes[i].accessCode;
                break;
            }
        }
     /*    alert("classcode is "+this.state.course_code+" lab is " +this.state.lab_id + " duedate is " +this.state.due_date
            +"courses are "+ JSON.stringify(this.state.classes) + "selected course is" +JSON.stringify(this.state.selected_course_name) )
*/        let labs =[];
        const lab = {
            labID:this.state.lab_id,
        }
        labs[0]=lab
        this.state.due_date.setDate(this.state.due_date.getDate()-1);
        const course= {
            email:this.props.email,
            course_number: this.state.course_code,
            labs: labs,
            date:this.state.due_date,
        };
       let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        var classArr=[];
        var classArray=[];

        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'add_lab_class', course, axiosConfig)
            .then((response) => {
                this.setState({
                    redirect: true
                })

                this.render()

            })
            .catch((error) => {
                ToastsStore.error("That course already has this lab assigned to it.")
                }
            );
    }

    renderBanner() {
        return (
            <div className="banner">
                <img src={icon} alt="icon" width="30px" height="30px"/>
                <label>VirtuLab</label>
            </div>
        )
    }

    renderNavigation() {
        return (
            <div>
                <Navbar style={{backgroundColor: "lightgray", marginLeft: 100, marginRight: 200}}
                        className={"justify-content-between"}>
                    <Nav>
                        <Button href="instructor_home" style={{backgroundColor: "#e88f65ff"}} variant="primary">Go
                            Back</Button>
                    </Nav>

                    <Nav>
                        <Image onClick={this.setRedirectAcct} className={"config_image"}
                               src="https://icon-library.net/images/config-icon/config-icon-21.jpg" rounded/>
                    </Nav>
                </Navbar>
            </div>
        )
    }
    getClassList(){
        var lis = [];
        for (let i=0; i<this.state.classes.length; i++){
            lis[i]=this.state.classes[i].classname
        }
        return lis;
    }
    handleDateChange = date => {
        console.log("doot" + date)
        this.setState({
            due_date: date

        });
    };
    handleCourseChange = course => {

        this.setState({
            selected_course_name:course

        });
    };
    render() {
        if (this.state.redirect) {
            return <Redirect exact to="/instructor_home"/>;
        }
        else if(!this.state.lab_loaded)
        {
            //  alert("loading");
            this.loadLab();
            return null;
        }
        else  if (this.state.loading_course){
            console.log("loading classes", this.state.classes);
            this.updateClasses();
            return null;


        }else {
            return (
                <div>
                    {this.renderBanner()}
                    <ToastsContainer store={ToastsStore}/>
                    {this.renderNavigation()}

                    <div className={"lightblue centered"}
                         style={{display: 'flex', justifyContent: 'center', alignItems: 'top', height: '100vh'}}>
                        <br/>
                        <div className="box-container" style={{width: '50vh'}}>
                            <form onSubmit={this.handleAddClass}>
                                <h1 className={"accountH1"}>Add Lab to Class</h1>
                                <h3 className="accountH3">Course</h3>

                                <FormGroup controlId="formBasicText" bsSize="large">
                                    <Dropdown options={this.getClassList()}
                                              onChange={(e) => this.handleCourseChange(e)}
                                              value={this.state.selected_course_name}
                                              placeholder="Select a course" />
                                </FormGroup>


                                <h3 className="accountH3">Due Date</h3>
                                <FormGroup controlId="formBasicText" bsSize="large">

                                    <DatePicker
                                        selected={this.state.due_date}

                                        onChange={(e) => this.handleDateChange(e)}
                                    />

                                </FormGroup>

                                <Button style={{backgroundColor: 'orange', color: "white"}} block bsSize="large"
                                        type="submit">
                                    Save
                                </Button>


                            </form>


                        </div>

                    </div>


                </div>
            );
        }
    }
}

export default assign_lab;