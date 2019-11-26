import React from 'react';

import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
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
        console.log(e)
        console.log(equipment)
        if(this.props.step===0)
        {
            console.log("step 0")
            equipment.disabled = !equipment.disabled;

            e.target.style.opacity=e.target.style.opacity==0.3?1:0.3;

        }

            this.props.handleAddEquipment(this.props.step,equipment)


    }

    createCollapsible(eventIndex,type,equipments)
    {

        return(

            <div style={{width:"100%"}}>

                <Accordion.Toggle className={"row1"} style={{marginRight:0,width:"100%",backgroundColor:"#50b0b5",fontWeight:"bold"}} as={Card.Header} eventKey={eventIndex}>


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
        // console.log("at step "+this.props.step+" and "+equipment.name+" is disabled "+equipment.disabled)

        if(!equipment.disabled || this.props.step===0)
        {
            return(
                <Button onClick={(e) => this.handleOnClick(e, equipment)}

                          style={{width:"100%",color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5}}>

                    <Equipment image={equipment.image} description={equipment.toString()}/>

                </Button>
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
    renderGlassware()
    {
        var glassware = this.props.set['Glassware'];
        // for (var i in a_hashmap)
        //     (
        //         this.createCollapsible(index,glass,glassware[glass])
        //     )

        return(
            Object.keys(glassware).map((elements,index)=>
                (
                    this.createCollapsible(index,elements,glassware[elements])
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
                    style={{borderStyle:"solid",justifyContent:'center',alignItems:'center',borderWidth:1,marginTop:10,backgroundColor: '#96E2FA',color:"white",height:"8vh"}}
                    defaultActiveKey="Solutions" transition={false} id="noanim-tab-example">

                    <Tab eventKey="Solutions"
                     title={
                         <div style={{height:"5vh",width:"8vh"}}>  Solutions </div>}>
                    {/*{
                             <div style={{display:"inline-block"}}>  Solutions <img src={solution} className={"images"} /></div>}*/}

                        <div style={{ overflowY: "scroll",height:"35vh"}} >
                             <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>

                                 {this.renderArray('Solution')}



                    </ButtonGroup>
                        </div>
                </Tab>
                <Tab eventKey="Glassware" title={
                    <div style={{height:"5vh",width:"8vh"}}> Glassware </div>} >
                    <div style={{ overflowY: "scroll",height:"35vh"}} >
                    <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>

                        <Accordion style={{width:"100%"}} defaultActiveKey="0">
                            {this.renderGlassware()}



                        </Accordion>



                    </ButtonGroup>
                    </div>

                </Tab>
                <Tab eventKey="Tools" title={
                    <div style={{height:"5vh",width:"8vh"}}>  Tools</div>} >
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



