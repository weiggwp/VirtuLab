import InstructorHeader from "./instructorHeader";
import {Button, Col, Container, FormGroup, Image, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import axios from "axios";
import GLOBALS from "../Globals";
import {ToastsStore} from "react-toasts";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
class view_lab_course extends React.Component
{

    constructor(props)
    {
        super(props);


        this.state={
            // handleExpand : this.handleExpand.bind(this,id)
            count:0,
            classes : props.classes,
            loaded: false,
            students:[],
            due_date: "",
            redirectStat: false,
        }

    }
    handleDateChange = date => {
       // console.log("doot" + date)
        this.setState({
            due_date: date

        });
    };
    handleChangeDueDate = (e)=>{
        e.preventDefault();
        console.log(this.state.due_date)


    }
    handleChangeDate= (e) =>{
        alert("date is "+this.state.due_date)
        e.preventDefault();
        let labs =[];
        const lab = {
            labID:this.props.location.state.labID
        }
        labs[0]=lab
        const course= {

            code: this.props.location.state.courseID,
            labDTOS:labs,
            date:this.state.due_date,
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };
        axios.post(GLOBALS.BASE_URL + 'set_date', course, axiosConfig)
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




    getStudents(){
        console.log()
        let labs =[];
        const lab = {
            labID:this.props.location.state.labID
        }
        labs[0]=lab
        const course= {
            email:this.props.email,
            course_number: this.props.location.state.courseID,
            labs: labs
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",

            }
        };

        var studentList=[];
        console.log("state is "+JSON.stringify(this.props.location.state))
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_completion', course, axiosConfig)
            .then((response) => {
                console.log("resp is "+JSON.stringify(response))
                console.log(response)
                for (let i=0; i<response.data.length; i++){
                    let comp= "N/A";
                    if (response.data[i].completed==1){
                        comp="Yes"
                    }
                    studentList[i]={name:response.data[i].firstName+" "+response.data[i].lastName,email:response.data[i].email,
                        completed:comp};
                }
                let date =new Date(this.props.location.state.due_date);
                console.log("date is " +date)

             //   date.setDate(date.getDate()-1);
                console.log("date is " +date)
                this.setState({
                   loaded: true,
                    students:studentList,
                    due_date: date,
                })

                this.render()

            })
            .catch((error) => {
                console.log("beep")
                console.log(error)
                for (let i=0; i<4; i++){
                    studentList[i]={name:"yeet",email:"yeetmail",completed:"N/A"};
                }
                this.setState({
                    loaded: true,
                    students:studentList
                })
                }
            );
    }

    redirectstats=()=>{
        this.setState({
            redirectStat: true
        })

    }
render() {


    if (this.state.redirectStat) {
        return <Redirect exact to='/statistics' />
    }

    if (this.state.loaded==false){
        this.getStudents();
        this.setState({loaded:true})
        return null;
    }
        return (
            <div>

                <InstructorHeader currentTab="Labs"/>
                <Navbar>
                    <Navbar.Brand href="#instructor_home"></Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Instructor: {this.props.name}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>

                <Button style={{backgroundColor: 'orange', color: "white"}}
                        onClick={this.redirectstats}>
                    Statistics
                </Button>

                <div>
                    <div>
                        <form onSubmit={this.handleChangeDate}>
                        <FormGroup controlId="formBasicText" bsSize="large">

                        <DatePicker
                            selected={this.state.due_date}

                            onChange={(e) => this.handleDateChange(e)}
                        />&nbsp;
                        <Button style={{backgroundColor: 'orange', color: "white"}}
                                type="submit">
                            Update Due Date
                        </Button>
                    </FormGroup>
                        </form>
                        <Container fluid className="noPadding">

                        <Row className="noMargin">
                        <Col md={{span:3,offset:2}} >
                            <h3 className="accountH3">Name</h3>

                        </Col>


                        <Col md={{span:3,offset:1}} >
                            <h3 className="accountH3">E-mail Address</h3>

                        </Col>

                        <Col md={{span:3,offset:0}} >
                            <h3 className="accountH3">Submitted</h3>

                        </Col>
                        </Row>

                        </Container>



                        {this.state.students.map(student=> (
                            <div style={{
                                textAlign: "left", marginLeft: 40, marginRight: 40, marginTop: 10,
                                borderStyle: "dashed", borderWidth: 1
                            }}>

                                <Row className="noMargin">
                                    <Col md={{span:3,offset:2}} >
                                        <h3 className="accountH3">{student.name}</h3>

                                    </Col>


                                    <Col md={{span:3,offset:1}} >
                                        <h3 className="accountH3">{student.email}</h3>

                                    </Col>

                                    <Col md={{span:3,offset:0}} >
                                        <h3 className="accountH3">{student.completed}</h3>

                                    </Col>
                                </Row>
                            </div>

                        ))}


                    </div>
                    <div>







                    </div>
                    {/*{<Expandable_Classes style={"settingsH3"}/>}*/}


                </div>

            </div>




        )
    }

}
export {view_lab_course}