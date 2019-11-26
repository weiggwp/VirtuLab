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


        this.state={
            // handleExpand : this.handleExpand.bind(this,id)
            count:0,
            classes : props.classes,
            loaded: false,
        }

    }
    handleExpand(id)
    {

    }
    getCount()
    {

        return (this.state.count).toString();
    }
    addAndGetCount()
    {
        return (this.state.count++).toString();
    }
    resetCount()
    {
        this.state.count = 0;
    }

    render()
    {
        let style = this.props.style;
        let classes = this.props.classes;
        let expand = "https://www.materialui.co/materialIcons/navigation/expand_less_black_192x192.png";
        console.log(classes + " is classes " + "props is "+JSON.stringify(this.props))


            return(
                <div>
                    <Accordion className={"box border"}>
                        {classes.map(classItem => (
                            <Course style={this.props.style}
                                   role={this.props.role}
                                    courseID={classItem.accessCode} class={classItem}
                                    icount={this.getCount()} fcount={this.addAndGetCount()}/>




                                    ))}

                    </Accordion>
                </div>

            );

    }


}

export {Expandable_Classes};