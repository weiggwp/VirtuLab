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

import Accordion from "react-bootstrap/Accordion";

import {floatEqual} from "../clone"
class EquipmentList extends React.Component

{
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);


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

    createCollapsible(eventIndex, type, equipments) {
        return (
            <div style={{width: "100%"}}>

                <Accordion.Toggle className={"row1 equipmentCollapsible"} as={Card.Header} eventKey={eventIndex}>


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



