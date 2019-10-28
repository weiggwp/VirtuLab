import React from 'react';
import {Navbar,Nav,Image} from "react-bootstrap";
import '../stylesheets/student_home.css';

class Expandable_Classes extends React.Component
{
    constructor(props)
    {
        super(props);
        this.states={
            // handleExpand : this.handleExpand.bind(this,id)
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
    render()
    {
        let style = this.props.style;
        let classes = this.states.classes;




        return (
            <div className="box">
                {classes.map(classItem => (


                    <Navbar  className={"justify-content-between border"}>
                        <Nav >


                            <h3 className={style}>{classItem.classname}</h3>

                        </Nav>

                        <Nav >

                            <Image  className={"config_image"} src="https://www.materialui.co/materialIcons/navigation/expand_less_black_192x192.png" rounded />

                        </Nav>

                    </Navbar>




                ))}

            </div>
        );
    }


}

export {Expandable_Classes};