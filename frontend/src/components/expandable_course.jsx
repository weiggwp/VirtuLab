import React from 'react';
import {Navbar,Nav,Image} from "react-bootstrap";
import '../stylesheets/student_home.css';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {Course} from './Course.jsx'

const expand_icons = {
    less: "https://www.materialui.co/materialIcons/navigation/expand_less_black_192x192.png",
    more: "https://www.materialui.co/materialIcons/navigation/expand_more_black_192x192.png"
};
class Expandable_Classes extends React.Component
{

    constructor(props)
    {
        super(props);
        this.states={
            // handleExpand : this.handleExpand.bind(this,id)
            count:0,
            classes : [

                {classname:"Class 1: Study of Organisms and Behaviors| Fall 2019",
                    clicked:false},
                {classname:'Class 2: Introduction to General Chemistry| Fall 2019',
                    clicked:false}
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