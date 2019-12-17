import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
import Redirect from "react-router-dom/es/Redirect";
import axios from "axios";
import GLOBALS from "../Globals";

const check={
    incomplete:"https://cdn4.iconfinder.com/data/icons/176-material-design-outline-core/24/check-box-blank-512.png",
    complete:"https://cdn4.iconfinder.com/data/icons/176-material-design-outline-core/24/check-box-512.png"
}
class Lab extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state= {
            completed : false,
            showCompleted : false,  //if true, show full list
            labNum :0,
            name : '',
            due : Date,
            isInstructor:false,
            gottenRole:false,
            lab:undefined,
            renderLab:true,
            renderStudent:false,
            renderInstructor:false,
        }
    }
    onClick =()=>{
        // console.log(this.props.role +" and "+this.props.labID +" and course is " +this.props.courseID)
        if (this.props.role=='instructor'){
            this.setState({renderInstructor:true});
            this.render()
        }
        else{
            const lab = {

                labID:this.props.labID
            };
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                    'responseType': 'json'
                }
            };
            axios.post(GLOBALS.BASE_URL + 'get_lab', lab, axiosConfig)
                .then((response) => {
                    console.log("resp is ");
                    console.log(response.data)
                    this.setState({lab:response.data,renderStudent:true})
                })
                .catch((error) => {
                    alert("Lab not found.");
                    return null
                    }
                );


            this.render()
        }
        //window.location.href="http://localhost:3001/do_lab";
    }
    getDueDate(){

    }
    render() {
        // console.log("props LAB is " + JSON.stringify(this.props))
        if (this.state.renderLab) {
            this.getDueDate();
            this.setState({renderLab: false})
            return null;
        } else if (this.state.renderStudent) {
            // console.log("complete is "+this.props.complete)
            // console.log("steps are ")
            // console.log(this.props.steps,)
            return <Redirect exact to={{
                pathname: '/do_lab',

                state: {
                    labID: this.props.labID,
                    lab_name:this.state.lab.name,
                    due_date:this.props.due_date,
                    courseID: this.props.courseID,
                    steps:this.state.lab.steps,
                    equipments:this.state.lab.equipments,
                    isComplete:this.props.complete,
                },
            }}/>
        } else if (this.state.renderInstructor) {
            //  alert("classes are " +this.props.courseID)
            // console.log("labname is "+this.props.lab_name);
            return <Redirect exact to={{
                pathname: '/view_lab_course',
                state: {
                    labID: this.props.labID,
                    due_date:this.props.due_date,
                    lab_name:this.props.lab_name,
                    courseID: this.props.courseID,

                },
            }}/>;

        } else {
        }
        let date ="";
        if (this.props.due_date==null||this.props.due_date==undefined) {

        }
        else {
            // console.log("date is " +this.props.due_date)
            let realDate=new Date(this.props.due_date)
          //  realDate.setDate(realDate.getDate()-1);
            date =   realDate.toString().substring(0,10)
        }
        let isComplete='incomplete'
        if (this.props.complete){
            isComplete='complete'
        }
        return (

            <div onClick={this.onClick} style={{border: '5px solid gray', borderBottomColor: 'black'}}>
                <Navbar className={"justify-content-between"}>
                    <Nav>


                        <label className={this.props.style}>{this.props.lab_name}</label>

                    </Nav>


                    <Nav className={"ml-auto"}>
                        <label className={this.props.style} style={{marginBottom: 0}}>Due: {date}</label>

                        <Image className={"config_image"} src={check[isComplete]} rounded/>

                    </Nav>

                </Navbar>
            </div>
        );
    }

}

export {Lab};