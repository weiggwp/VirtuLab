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


        const course = {
            code: this.state.code,
            course_id: e.id,
            email: this.props.email
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'drop', course, axiosConfig)
            .then((response) => {
                ToastsStore.success("Course is dropped")
                    this.render()
                    window.location.reload();


            })
            .catch((error) => {
                    this.setState({
                        errors: 'Error! No course found with the code.',
                        code: '',
                    });
                    ToastsStore.error("Error in dropping")
                    //    this.render()
                    //  window.location.reload();

                }
            );

    };



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
                                <Form inline onSubmit={this.handleDropCourse.bind(null, {id: classItem.classID})}>

                                    <button className={"dropButton"} block bsSize="small" type="submit">
                                        Drop Class
                                    </button>
                                </Form>

                            </Col>
                        </Row>
                    ))}

                </div>
            );

    }


}

export {Droppable_course};
