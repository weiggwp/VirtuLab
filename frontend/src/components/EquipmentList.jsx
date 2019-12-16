import React from 'react';

import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
import '../stylesheets/Equipments.css';
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Equipment} from "./Equipment";


import more from "../Images/more.jpg";
import disable from "../Images/disable_box.png";
import enable from "../Images/enable_box.png";

import Accordion from "react-bootstrap/Accordion";

import {floatEqual} from "../clone"
class EquipmentList extends React.Component

{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state={
            type:{}

        }


    }

    handleOnClick = (e, equipment) => {
        e.persist();
        if (this.props.step === 0) {
            equipment.disabled = !equipment.disabled;

            // e.target.style.opacity = floatEqual(e.target.style.opacity,0.3) ? 1 : 0.3;
            // console.log("op", e.target.style.opacity);

        }

        this.props.handleAddEquipment(this.props.step, equipment)


    };

    getImg=(type)=>
    {
        if(this.props.step===0)
        {

            if(this.state.type[type]!==undefined)
            {
                //true = disabled, false = enabled

                return this.state.type[type]===true?enable:disable;
            }
            else
            {
                return disable;
            }
        }
        else
            return more;
    }
    addClassName=(type)=>
    {
        if(this.props.step===0)
            return "column2 disable"
        else
            return "column2"
    }
    handleDisable=(type,equipments)=>
    {
        if(this.props.step===0)
        {
            if(this.state.type[type]===undefined)
            {
                const newType = true;
                const newTypes=this.state.type;
                newTypes[type]=newType;
                this.setState(
                    {
                        type: newTypes
                    },
                    () => {
                        equipments.map((equipment) => (
                            equipment.disabled=true
                        ))
                        this.forceUpdate()
                        this.props.update();


                    }
                    )
            }
            else
            {
                const newTypes=this.state.type;
                newTypes[type]=!this.state.type[type];
                this.setState(
                    {
                        type: newTypes
                    }, () => {
                        equipments.map((equipment) => (
                            equipment.disabled=this.state.type[type]
                        ))

                        this.forceUpdate()
                        this.props.update();


                    }
                )

            }


        }

    }

    createCollapsible(eventIndex, type, equipments) {
        if(this.props.step===0){

            return (
                <div style={{width: "100%"}}>

                    <div className={"tabRow"} style={{backgroundColor: "#b5c7c9"}}>

                    <Accordion.Toggle className={"equipmentCollapsible"} as={Card.Header} eventKey={eventIndex}>


                        <div className={"columnTab"}>{type}</div>

                    </Accordion.Toggle>
                    <img className={this.addClassName(type)} onClick={()=>this.handleDisable(type,equipments)} src={this.getImg(type)} alt={"404"}/>

                    </div>

                    <Accordion.Collapse style={{width: "100%"}} eventKey={eventIndex}>
                        <div>
                            {equipments.map((equipment) => (
                                this.renderButton(equipment)
                            ))}
                        </div>
                    </Accordion.Collapse>
                </div>


            )
        }
        const disabled = this.checkDisabledCollapsible(equipments)
        if(!disabled) {
                return (
                    <div style={{width: "100%"}}>

                        <Accordion.Toggle className={"row1 equipmentCollapsible1"} as={Card.Header} eventKey={eventIndex}>


                            <div className={"column1"}>{type}</div>
                            <img className={"column2"} src={more} alt={"404"}/>

                        </Accordion.Toggle>

                        <Accordion.Collapse style={{width: "100%"}} eventKey={eventIndex}>
                            <div>
                                {equipments.map((equipment) => (
                                    this.renderButton(equipment)
                                ))}
                            </div>
                        </Accordion.Collapse>
                    </div>


                )
        }

    }

    checkDisabledCollapsible(equipments)
    {
        for (var i = 0; i < equipments.length; i++)
        {
           // console.log(equipments[i])
            if(!equipments[i].disabled)
                return false;
            //if there's at least an element not disabled
        }
        return true;

    }

    renderButton(equipment) {
        const opacity = equipment.disabled ? "0.5" : "1";
        const borderColor = equipment.disabled ? "#C5C5C5" : "blue";

        if (!equipment.disabled || this.props.step === 0) {
            return (
                <button
                    onClick={(e) => this.handleOnClick(e, equipment)}

                    className={"equipment"}
                    style={{borderColor: borderColor, opacity: {opacity}}}>

                    <Equipment opacity={opacity} image={equipment.image} name={equipment.name} cap={equipment.capacity} description={equipment.toString()}/>

                </button>
            )
        }
    }


    renderArray(elementType) {
        const solutions = this.props.set[elementType];//gives the list of solutions

        return (
            solutions.map((solution) => (
                this.renderButton(solution)

            ))

        )

    }

    renderCollapsible(type, offset = 0) {
        const equipment = this.props.set[type];

        return (
            Object.keys(equipment).map((elements, index) =>
                (
                    this.createCollapsible(index + offset, elements, equipment[elements])
                )
            )
        )


    }


    render() {
        return (
            <Tabs
                id={"noanim-tab-example"}
                className={"equipmentListHeader"}
                defaultActiveKey="Solutions"
                transition={false}
            >

                <Tab eventKey="Solutions"
                     title={<div className={"equipmentTitle"}> Solutions </div>}
                >

                    <div style={{overflowY: "scroll", height: "35vh"}}>
                        <ButtonGroup vertical style={{width: "100%", backgroundColor: "transparent"}}>

                            <Accordion style={{width: "100%"}} defaultActiveKey="0">
                                {this.renderCollapsible('Solution')}
                            </Accordion>


                        </ButtonGroup>
                    </div>
                </Tab>
                <Tab eventKey="Glassware" title={
                    <div className={"equipmentTitle"}> Glassware </div>}>
                    <div style={{overflowY: "scroll", height: "35vh"}}>
                        <ButtonGroup vertical style={{width: "100%", backgroundColor: "transparent"}}>

                            <Accordion style={{width: "100%"}} defaultActiveKey="0">
                                {this.renderCollapsible('Glassware')}


                            </Accordion>


                        </ButtonGroup>
                    </div>

                </Tab>
                <Tab eventKey="Tools" title={
                    <div className={"equipmentTitle"}> Tools</div>}>
                    {/*<Sonnet />*/}


                    <div style={{overflowY: "scroll", height: "35vh"}}>
                        <ButtonGroup vertical style={{width: "100%", backgroundColor: "transparent"}}>
                            {this.renderArray('Tools')}


                        </ButtonGroup>
                    </div>
                </Tab>
            </Tabs>


        );
    }
}

export {EquipmentList};



