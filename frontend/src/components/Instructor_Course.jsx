import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import {Lab} from './lab.jsx'
import {Button} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Redirect from "react-router-dom/es/Redirect";

const imagesPath = {
    minus: "https://www.materialui.co/materialIcons/navigation/expand_more_black_192x192.png",
    plus: "https://www.materialui.co/materialIcons/navigation/expand_less_black_192x192.png"
};

class Instructor_Course extends React.Component {

    constructor(props) {
        super(props);
        this.redirect={
            labID:'',
            courseID:'',
            due_date:'',
        }
        this.state = {
            open : false,
            redirectRoster:false,
            redirectStat:false
        }

    }
    clicked()
    {
        this.state.open = this.state.open === false;
        // console.log("clicked");
    }
    toggleImage = () => {
        let x = !(this.state.open);
        this.setState({open: !this.state.open});
        // console.log(this.states.open);
    };
    getImageName = () => this.state.open ? 'plus' : 'minus';

    redirectToRoster=(labID,date,courseID)=>
    {

        this.redirect={
            labID:labID,
            due_date:date,
            courseID:courseID
        }
        console.log(this.redirect)
        this.setState(
            {
                redirectRoster:true
            }
        )

    }

    redirectToStat=(labID,date,courseID)=>
    {

        this.redirect={
            labID:labID,
            due_date:date,
            courseID:courseID
        }
        console.log(this.redirect)
        this.setState(
            {
                redirectStat:true
            }
        )

    }

    render()
    {
        if(this.state.redirectRoster)
        {
            return <Redirect exact to={{
                pathname: '/view_lab_course',
                state: {
                    labID: this.redirect.labID,
                    due_date:this.redirect.due_date,
                    courseID: this.redirect.courseID,
                },
            }}/>;
        }

        if (this.state.redirectStat) {
            return <Redirect exact to='/statistics' />
        }
        // console.log(this.props.class);
        // console.log("props is "+JSON.stringify(this.props.class))
        const imageName = this.getImageName();
        return(
            <div style={{borderWidth:2,borderColor:"black"}} >
                <Accordion.Toggle as={Card.Header} onClick={this.toggleImage}
                                  eventKey={this.props.icount} style={{backgroundColor:"#afc7bf"}}>
                    <Navbar  className={"justify-content-between"}>
                        <Nav >


                            <h3 className={this.props.style}><b> Class Name:  </b>{this.props.class.classname}
                                <b> Access code:          </b> {this.props.class.accessCode}
                            </h3>

                        </Nav>

                        <Nav >

                            <Image  className={"config_image"}  src={imagesPath[imageName]} rounded />

                        </Nav>

                    </Navbar>
                </Accordion.Toggle>
                <Accordion.Collapse style={{paddingBottom:10,backgroundColor:"lightblue",borderWidth:2}} eventKey={this.props.fcount}>

                    <div style={{}}>
                        {this.props.class.labs.map(classItem => (

                            <Dropdown as={ButtonGroup} style={{width: "100%",borderWidth:0}}
                                      class={"dropdown-menu-right dropdown-button-drop-right"}>

                                <Dropdown.Toggle className={"course_lab"} >

                                    <div>
                                    <label className={'name'}>{classItem.lab_name}</label>


                                    <label className={'date'} >Due: {classItem.date.substring(0,10)}</label>


                                    </div>

                                </Dropdown.Toggle>
                                <Dropdown.Menu class="dropdown-menu">
                                    <Dropdown.Item class={"dropdown-item"}
                                                   onClick={()=>this.redirectToRoster(classItem.labID,classItem.date,this.props.courseID)}
                                                   eventKey="1">View roster</Dropdown.Item>
                                    <Dropdown.Item class={"dropdown-item"}
                                                   onClick={()=>this.redirectToStat(classItem.labID,classItem.date,this.props.courseID)}
                                                   eventKey="2">View statistics</Dropdown.Item>
                                    <Dropdown.Item class={"dropdown-item"}
                                                   onClick={()=>this.redirectToStat(classItem.labID,classItem.date,this.props.courseID)}
                                                   eventKey="3">Unassign</Dropdown.Item>


                                </Dropdown.Menu>
                            </Dropdown>



                        ))}
                    </div>




                </Accordion.Collapse>
            </div>


        );
    }
}

export {Instructor_Course};