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

        }
    }
    onClick(){
        window.location.href="http://localhost:3001/do_lab";
    }

    render() {

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