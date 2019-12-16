import InstructorHeader from "./instructorHeader";
import {Button, Col, Container, FormGroup, Image, Nav, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import React from "react";
import axios from "axios";
import GLOBALS from "../Globals";
import {ToastsStore, ToastsContainer} from "react-toasts";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import '../stylesheets/stats.css';
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
            ontimeStudents:[],
            showAllStudents:true,
            due_date: "",
            redirectStat: false,
            redirectHone:false,
            courseID: this.props.location.state.courseID,
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


    }
    handleChangeDate= (e) =>{
        // alert("date is "+this.state.due_date)
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
                ToastsStore.success("New date has been set.")
                this.setState({
                    redirectHome: true
                })

                this.render()

            })
            .catch((error) => {
                    ToastsStore.error("That course already has this lab assigned to it.")
                }
            );
    }




    getStudents(){
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
        let date =new Date(this.props.location.state.due_date);
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)
        var studentList=[];
        let ontimeStudentList=[];
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'get_completion', course, axiosConfig)
            .then((response) => {
                let count=0;
                for (let i=0; i<response.data.length; i++){
                    let comp= "N/A";
                    if (response.data[i].completed==1){
                        if (response.data[i].dateCompleted==null){
                            comp="Completed, date unavailable"
                        }
                        else comp=response.data[i].dateCompleted.substring(0,10) + ", "+response.data[i].dateCompleted.substring(11,19)
                        console.log("date is ")
                        console.log(response.data[i])
                        console.log(response.data[i].dateCompleted)
                    }
                    studentList[i]={name:response.data[i].firstName+" "+response.data[i].lastName,email:response.data[i].email,
                        completed:comp};
                    if (new Date(response.data[i].dateCompleted)<date&&response.data[i].completed==1){
                        ontimeStudentList[count++]=studentList[i];
                    }
                    else{
                        console.log("respdate is ")
                        console.log(response.data[i].dateCompleted)
                        console.log("duedate is ")
                        console.log(date)

                    }
                }

                this.setState({
                   loaded: true,
                    students:studentList,
                    ontimeStudents:ontimeStudentList,
                    due_date: date,
                })

                this.render()

            })
            .catch((error) => {

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

    redirectstats(){
        this.setState({
            redirectStat: true
        })

    }

    unassign(){

        if (!window.confirm("Are you sure you would like to unassign this class? All data will be lost.")){
            return null
        }

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


        console.log(course)
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'unassign_lab', course, axiosConfig)
            .then((response) => {
                //console.log("Success")
                this.setState({redirectHome:true})
                this.render()


            })
            .catch((error) => {

                console.log(error)

            })

    }
    updateInputValue(e){
        let isChecked = e.target.checked;
        if (isChecked) {
            this.setState({showAllStudents:false})

        }
        else{
            this.setState({showAllStudents:true})
        }
    }
    handleCheckBox(){

    }

    render() {
    if (this.state.redirectHome){
        return <Redirect exact to={{
            pathname: '/instructor_home',
        }}/>

    }
    if (this.state.redirectStat) {

        return <Redirect exact to={{
            pathname: '/statistics',
            state: {
                labID: this.props.location.state.labID,
                courseID: this.props.location.state.courseID,
                lab_name:this.props.location.state.lab_name

            },
        }}/>

    }

    if (this.state.loaded==false){
        this.getStudents();
        this.setState({loaded:true})
        return null;
    }
    console.log("abname is "+this.props.location.state.lab_name)
    console.log("ontime is");
    console.log(this.state.ontimeStudents)
    let students = this.state.students;
    if (!this.state.showAllStudents){
        students=this.state.ontimeStudents
    }
        return (
            <div>

                <InstructorHeader currentTab="Labs"/>
                {this.toolbar()}

                <div >

                    <div >
                        <div style={{width:"100%",textAlign:"left",marginLeft:20}}>
                            <label className="contain" style={{}}>
                                Only show labs completed on time
                                <input type="checkbox"onClick={() => this.handleCheckBox()}  onChange={e => this.updateInputValue(e)}/>
                                <span className="checkmark">

                                    </span>
                            </label>
                        </div>


                        <form onSubmit={this.handleChangeDate} style={{marginTop:5}}>
                        <FormGroup controlId="formBasicText" bsSize="large">

                        <DatePicker
                            selected={this.state.due_date}

                            onChange={(e) => this.handleDateChange(e)}
                        />&nbsp;
                        <button className="updateButton" style={{}}
                                type="submit">
                            Update Due Date
                        </button>
                    </FormGroup>

                        </form>
                        <div style={{
                            textAlign: "left", marginLeft: 40, marginRight: 40, marginTop: 10
                        }}>

                        <Row className="noMargin">


                        <Col md={{span:3,offset:2}} >

                            <h3 className="accountH3" >Name</h3>

                        </Col>


                        <Col md={{span:3,offset:1}} >
                            <h3 className="accountH3">E-mail Address</h3>

                        </Col>

                        <Col md={{span:3,offset:0}} >
                            <h3 className="accountH3">Submitted</h3>

                        </Col>
                        </Row>

                        </div>



                        {students.map(student=> (
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
                    <ToastsContainer store={ToastsStore} />

                </div>

            </div>




        )
    }
    toolbar_obselete()
    {
        return (
            <Navbar style={{ marginLeft:40,marginRight:40,marginTop:10,marginBottom:10}}  className={"justify-content-between bar"}>
                <Nav >
                   { this.props.location.state.lab_name}
                </Nav>

                <Nav >

                    <Link to="/instructor_home">
                        <Image  onClick={this.setRedirectHome} className={"config_image"} src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/exit-512.png" rounded />
                    </Link>
                </Nav>

            </Navbar>
        )
    }

    toolbar(){
        return (
            <div>
                <Navbar style={{backgroundColor: "#bcc2d7",marginLeft:40,marginRight:40,marginBottom:20}}
                        className={"justify-content-between"}>
                    <Nav>
                        <Nav>
                            <Button href="instructor_home" className="goBack" variant="primary">Go
                                Back</Button>
                        </Nav>
                    </Nav>

                    <Nav>
                        <h1 className={"title"}>Roster</h1>
                    </Nav>
                </Navbar>
            </div>
        )
    }

}
export {view_lab_course}