import React from 'react';
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import axios from "axios";
import GLOBALS from "../Globals";
import '../stylesheets/account_settings.css';

import {ToastsStore} from "react-toasts";


class Droppable_course extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            // handleExpand : this.handleExpand.bind(this,id)
            count:0,
            classes : props.classes,
            loaded: false,
            email: props.email
        }


    }


    handleDropCourse = (e) => {
        console.log("e is ")
        console.log(e)
        let pass = prompt("Please enter password to confirm dropping of class. Note that lab" +
            " completion data will be lost.");
        if (pass==""||pass==null||pass==undefined)return null
        console.log(pass )
        const user = {
            password:pass,
            email: this.props.email
        }
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(GLOBALS.BASE_URL + 'verify_password',user, axiosConfig)
            .then((response) => {


                const course = {
                    code: this.state.code,
                    course_id: e,
                    email: this.props.email
                };
                //console.log("where we droppin")


                axios.post(GLOBALS.BASE_URL + 'drop', course, axiosConfig)
                    .then((response) => {
                        ToastsStore.success("Course is dropped")
                        this.render()
                        window.location.reload();

                    })
                    .catch((error) => {
                        //console.log("rip")
                            this.setState({
                                errors: 'Error! No course found with the code.',
                                code: '',
                            });
                            //    this.render()
                            //  window.location.reload();

                        }
                    );

            })
            .catch((error) => {
                ToastsStore.error("Incorrect Password.")
                   //console.log("naw")


            })

                    //    this.render()
                    //  window.location.reload();

    }





        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'





    render()
    {
        let style = this.props.style;
        let classes = this.props.classes;

            return (

                <div>
                    {classes.map((classItem, index) => (


                        <Row >
                            <Col   md={{span: 5, offset: 2}}>
                                <h3 className={"courseName"}>{classItem.classname}</h3>
                            </Col>

                            <Col md={{span: 1, offset: 0}}>

                                    <Button className={"dropButton"}
                                            style={{ backgroundColor: 'orange',color:"white"}} block bsSize="large" type="submit"
                                            onClick=
                                        {() => this.handleDropCourse(classItem.classID)}>
                                        Drop Class
                                    </Button>


                            </Col>
                        </Row>
                    ))}

                </div>
            );

    }


}

export {Droppable_course};
