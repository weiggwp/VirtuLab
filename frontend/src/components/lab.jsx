import React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
import Redirect from "react-router-dom/es/Redirect";

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
            renderStudent:false,
            renderInstructor:false,
        }
    }
    onClick =()=>{
        console.log(this.props.role +" and "+this.props.labID +" and course is " +this.props.courseID)
        if (this.props.role=='instructor'){
            this.setState({renderInstructor:true});
            this.render()
        }
        else{
            this.setState({renderStudent:true});
            this.render()
        }
        //window.location.href="http://localhost:3001/do_lab";
    }

    render() {
        if (this.state.renderStudent){

        }
        else if (this.state.renderInstructor){
          //  alert("classes are " +this.props.courseID)
                return <Redirect exact to={{
                    pathname: '/view_lab_course',
                    state: {
                        labID:this.props.labID,
                        courseID:this.props.courseID,
                    },
                }}/>;

        }
        else
        return(

            <div onClick={this.onClick} style={{ border: '5px solid gray', borderBottomColor: 'black' }}>
                <Navbar  className={"justify-content-between"}>
                    <Nav >


                        <label className={this.props.style}>{this.props.labname}</label>

                    </Nav>


                    <Nav className={"ml-auto"}>
                        <label className={this.props.style} style={{color:"red",marginBottom:0}}>Due: Nov. 15,2019</label>

                        <Image  className={"config_image"}  src={check['incomplete']} rounded />

                    </Nav>

                </Navbar>
            </div>
        );
    }
}

export {Lab};