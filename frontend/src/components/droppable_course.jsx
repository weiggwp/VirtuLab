import React from 'react';
import {Button, Col, Form, FormControl, Row} from "react-bootstrap";
import axios from "axios";
import GLOBALS from "../Globals";

class Droppable_course extends React.Component
{
    constructor(props)
    {
        super(props);
        const user = {

        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'responseType': 'json'
            }
        };
        var classArr=[];
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'student_home', user, axiosConfig)
            .then((response) => {
               // console.log("resp is " +response.json())
                console.log("dat is " + JSON.stringify(response));
                console.log("resp is " +response.data[0].courseID);
                console.log("resp is " +response.data[0].courseName);
                for (let i=0; i<response.data.length; i++){
                    classArr[i]=response.data[i]

                }
                var classArray=[];

                for (let i=0; i<response.data.length; i++){
                    classArray[i]={classname:response.data[i].courseName,classID:response.data[i].courseID,
                        clicked:false};
                    console.log("class array[i] is " +classArray[i].classname)
                }
               // console.log("AAA classarray is "+classArray);
                this.states={
                    // handleExpand : this.handleExpand.bind(this,id)
                    count:0,
                    classes : classArray
                }
                //console.log("classes is now "+this.state.classes)
                this.render()
                super.render()
                //window.location.reload();
            })
            .catch((error) => {


                }

            );


        this.states={
            // handleExpand : this.handleExpand.bind(this,id)
            count:0,
            classes : [

            ]

        }


    }

    handleDropCourse = (e) => {
       console.log(e.id+"AAAAAA");
        const course = {
            code: this.state.code,
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

               // window.location.reload();
                console.log("success!");
            })
            .catch((error) => {
                    this.setState({
                        errors: 'Error! No course found with the code.',
                        code: '',
                    });
                    console.log("failure...");
                //    this.render()
                  //  window.location.reload();

                }
            );

    };



    render()
    {
        let style = this.props.style;
        let classes = this.states.classes;

        console.log("classes is " + JSON.stringify(classes[0]));
        console.log("classes is " +classes+",len is "+classes.length);
        let temp =["A","B"];
        for (let i=0; i<classes.length; i++){
            temp[i]=classes[i].classname;
            console.log("tempi is " +temp[i])
        } console.log("temp is " +temp)
        return (

            <div>
                {temp.map((classItem,index) => (


                    <Row>
                        <Col md={{span:5,offset:2}}>
                            <h3 className={style}>{classItem}</h3>
                        </Col>

                        <Col md={{ span: 1, offset: 0 }}>
                            <Form inline onSubmit={this.handleDropCourse.bind(null, { id: classItem })}>

                                <Button className={"dropButton"} block bsSize="small" type="submit">
                                    Drop Class
                                </Button>
                            </Form>

                        </Col>
                    </Row>




                ))}

            </div>
        );
    }


}

export {Droppable_course};