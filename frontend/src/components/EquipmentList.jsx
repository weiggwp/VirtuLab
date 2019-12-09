import React from 'react';

import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
import '../stylesheets/Equipments.css';
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Equipment} from "./Equipment";


import more from "../Images/more.jpg";

import Collapsible from 'react-collapsible';
import Accordion from "react-bootstrap/Accordion";
import Glassware from "../Glassware.js";

class EquipmentList extends React.Component

    //equipments are draggable
{
    constructor(props)
    {
        super(props);


    }

    handleOnClick=(e,equipment)=>
    {
        e.persist()
        if(this.props.step===0)
        {
            equipment.disabled = !equipment.disabled;

            e.target.style.opacity=e.target.style.opacity==0.3?1:0.3;

        }

            this.props.handleAddEquipment(this.props.step,equipment)


    }

    createCollapsible(eventIndex,type,equipments)
    {

        return(

            <div style={{width:"100%"}}>

                <Accordion.Toggle className={"row1 equipmentCollapsible"}  as={Card.Header} eventKey={eventIndex}>


                        <div className={"column1"}>{type}</div>
                        <img  className={"column2"} src={more} />

                </Accordion.Toggle>

                <Accordion.Collapse style={{width:"100%"}} eventKey={eventIndex}>
                    <div>
                    {equipments.map((equipment) => (

                        //,marginBottom:5 took out

                            this.renderButton(equipment)

                    ))}
                    </div>
                </Accordion.Collapse>
            </div>


        )
    }
    renderButton(equipment)
    {
        const opacity= equipment.disabled?"0.3":"1";
        const borderColor= equipment.disabled?"#C5C5C5":"blue";

        if(!equipment.disabled || this.props.step===0)
        {
            return(

                <button



                        onClick={(e) => this.handleOnClick(e, equipment)}

                        className={"equipment"}
                        style={{borderColor:borderColor,opacity:{opacity}}}>

                    <Equipment opacity={opacity} image={equipment.image} name={equipment.name} cap={equipment.capacity} description={equipment.toString()}/>

                </button>
            )
        }
    }
    renderArray(elementType)
    {
        var solutions = this.props.set[elementType];//gives the list of solutions

        return(
            solutions.map((solution) => (
                this.renderButton(solution)

            ))

        )

    }

    renderCollapsible(type,offset=0)
    {
        var equipment = this.props.set[type];
        // for (var i in a_hashmap)
        //     (
        //         this.createCollapsible(index,glass,glassware[glass])
        //     )

        return(
            Object.keys(equipment).map((elements,index)=>
                (

                    this.createCollapsible(index+offset,elements,equipment[elements])
                )


            )
            )


    }



    render() {
        // const beaker ="https://cdn4.iconfinder.com/data/icons/laboratory-4/58/9-512.png";
        // const water ="./Images/water.svg";
        // const flask ="https://cdn4.iconfinder.com/data/icons/medical-health-10/128/1-512.png";

        // const cylinder="https://static.thenounproject.com/png/161931-200.png";

        return(

                <Tabs
                    className={"equipmentListHeader"}
                    defaultActiveKey="Solutions" transition={false} id="noanim-tab-example">

                    <Tab eventKey="Solutions"
                     title={
                         <div className={"equipmentTitle"}>  Solutions </div>}>
                    {/*{
                             <div style={{display:"inline-block"}}>  Solutions <img src={solution} className={"images"} /></div>}*/}

                        <div style={{ overflowY: "scroll",height:"35vh"}} >
                             <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>

                                 <Accordion style={{width:"100%"}} defaultActiveKey="0">
                                 {this.renderCollapsible('Solution')}
                                 </Accordion>



                    </ButtonGroup>
                        </div>
                </Tab>
                <Tab eventKey="Glassware" title={
                    <div className={"equipmentTitle"}> Glassware </div>} >
                    <div style={{ overflowY: "scroll",height:"35vh"}} >
                    <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>

                        <Accordion style={{width:"100%"}} defaultActiveKey="0">
                            {this.renderCollapsible('Glassware')}



                        </Accordion>



                    </ButtonGroup>
                    </div>

                </Tab>
                <Tab eventKey="Tools" title={
                    <div className={"equipmentTitle"}>  Tools</div>} >
                    {/*<Sonnet />*/}


                    <div style={{ overflowY: "scroll",height:"35vh"}} >
                        <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>
                            {this.renderArray('Tools')}



                        </ButtonGroup>
                    </div>
                </Tab>
            </Tabs>



        );
    }
}

export {EquipmentList};



