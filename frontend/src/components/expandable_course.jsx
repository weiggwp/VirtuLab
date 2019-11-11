import React from 'react';
import {Navbar,Nav,Image} from "react-bootstrap";
import '../stylesheets/student_home.css';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {Course} from './Course.jsx'
import axios from "axios";
import GLOBALS from "../Globals";

const expand_icons = {
    less: "https://www.materialui.co/materialIcons/navigation/expand_less_black_192x192.png",
    more: "https://www.materialui.co/materialIcons/navigation/expand_more_black_192x192.png"
};
class Expandable_Classes extends React.Component
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
            }
        };
        var classArr=[];
        //axio sends message to backend to handle authentication
        // 'aws_website:8080/userPost'
        axios.post(GLOBALS.BASE_URL + 'student_home', user, axiosConfig)
            .then((response) => {

                for (let i=0; i<response.data.length; i++){
                    classArr[i]=response.data[i];

                }
                var classArray=[];
                for (let i=0; i<response.data.length; i++){
                    classArray[i]={classname:classArr[i],
                        clicked:false};
                }
                this.states={
                    // handleExpand : this.handleExpand.bind(this,id)
                    count:0,
                    classes : classArray,
                }
                this.render()
                super.render()


            })
            .catch((error) => {
                    this.setState({
                        errors: 'Error! No course found with the code.',
                        code: '',
                    });

                }

            );


        this.states={
            // handleExpand : this.handleExpand.bind(this,id)
            count:0,
            classes : [

            ],
        }

    }
    handleExpand(id)
    {

    }
    getCount()
    {

        return (this.states.count).toString();
    }
    addAndGetCount()
    {
        return (this.states.count++).toString();
    }
    resetCount()
    {
        this.state.count = 0;
    }

    render()
    {
        let style = this.props.style;
        let classes = this.states.classes;
        let expand = "https://www.materialui.co/materialIcons/navigation/expand_less_black_192x192.png";



            return(
                <div>
                    <Accordion className={"box border"}>
                        {classes.map(classItem => (
                            <Course style={this.props.style} classname={classItem.classname} icount={this.getCount()} fcount={this.addAndGetCount()}/>




                                    ))}

                    </Accordion>
                </div>

            );

    }


}

export {Expandable_Classes};