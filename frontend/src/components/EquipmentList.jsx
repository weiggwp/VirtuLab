import React from 'react';

import '../stylesheets/account_settings.css';
import '../stylesheets/student_home.css';
import {Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {Equipment} from "./Equipment";
import water from "../Images/water.svg";

import small_flask from "../Images/250mLFlask.svg";
import medium_flask from "../Images/500mLFlask.svg";
import large_flask from "../Images/1000mLFlask.svg";

import small_beaker from "../Images/250mLBeaker.svg";
import medium_beaker from "../Images/600mLBeaker.svg";
import large_beaker from "../Images/1000mLBeaker.svg";

import small_cylinder from "../Images/10mLGraduatedCylinder.svg";
import medium_cylinder from "../Images/25mLGraduatedCylinder.svg";
import large_cylinder from "../Images/50mLGraduatedCylinder.svg";

import small_pipette from "../Images/5mLPipette.svg";
import medium_pipette from "../Images/10mLPipette.svg";
import large_pipette from "../Images/25mLPipette.svg";

import small_volFlask from "../Images/100mLVolumetricFlask.svg";
import medium_volFlask from "../Images/250mLVolumetricFlask.svg";
import large_volFlask from "../Images/1000mLVolumetricFlask.svg";

import bunsun_burner from "../Images/bunsenBurner.svg";
import scale from "../Images/scale.svg";

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

    createCollapsible(eventIndex,type,equipments)
    {

        return(

            <div style={{width:"100%"}}>

                <Accordion.Toggle className={"row"} style={{width:"100%",backgroundColor:"#50b0b5",fontWeight:"bold"}} as={Card.Header} eventKey={eventIndex}>


                    <div className={"column1"}>{type}</div>
                        <img  className={"column2"} src={more} align="right" />

                </Accordion.Toggle>

                <Accordion.Collapse style={{width:"100%"}} eventKey={eventIndex}>
                    <div>
                    {equipments.map((equipment) => (

                        //,marginBottom:5 took out
                    <Button   onClick={() => this.props.handleAddEquipment(this.props.step,equipment.image)}

                              style={{width:"100%",color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5}}>

                        <Equipment image={equipment.image} description={equipment.toString()}/>

                    </Button>

                    ))}
                    </div>
                </Accordion.Collapse>
            </div>


        )
    }
    createFlasks()
    {
        return [new Glassware("Flask",small_flask,250,0,0),
            new Glassware("Flask",medium_flask,500,0,0),
            new Glassware("Flask",large_flask,1000,0,0),]
    }
    createCylinders()
    {
        return [new Glassware("Graduated Cylinder",small_cylinder,10,0,0),
            new Glassware("Graduated Cylinder",medium_cylinder,25,0,0),
            new Glassware("Graduated Cylinder",large_cylinder,50,0,0),]
    }
    createBeakers()
    {
        return [new Glassware("Beaker",small_beaker,250,0,0),
            new Glassware("Beaker",medium_beaker,600,0,0),
            new Glassware("Beaker",large_beaker,1000,0,0),]
    }
    createVolumetricFlasks()
    {
        return [new Glassware("Volumetric Flask",small_volFlask,100,0,0),
            new Glassware("Volumetric Flask",medium_volFlask,250,0,0),
            new Glassware("Volumetric Flask",large_volFlask,1000,0,0),]
    }
    createPipettes()
    {
        return [new Glassware("Pipettes",small_pipette,5,0,0),
            new Glassware("Pipettes",medium_pipette,10,0,0),
            new Glassware("Pipettes",large_pipette,25,0,0),]
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
                                 <Button  onClick={() => this.props.handleAddEquipment(this.props.step,water)} style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                                <Equipment image={water} description={"3.0L Distilled Water"}/>

                                {/*<span>Distilled water</span>*/}

                                </Button>



                    </ButtonGroup>
                        </div>
                </Tab>
                <Tab eventKey="Glassware" title={
                    <div style={{height:"5vh",width:"8vh"}}> Glassware </div>} >
                    <div style={{ overflowY: "scroll",height:"35vh"}} >
                    <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>

                        <Accordion style={{width:"100%"}} defaultActiveKey="0">
                            {this.createCollapsible(0,"Erlenmeyers",this.createFlasks())}
                            {this.createCollapsible(1,"Graduated Cylinders",this.createCylinders())}
                            {this.createCollapsible(2,"Pipettes",this.createPipettes())}
                            {this.createCollapsible(3,"Beakers",this.createBeakers())}
                            {this.createCollapsible(4,"Volumetric Flasks",this.createVolumetricFlasks())}



                        </Accordion>



                    </ButtonGroup>
                    </div>

                </Tab>
                <Tab eventKey="Tools" title={
                    <div style={{height:"5vh",width:"8vh"}}>  Tools</div>} >
                    {/*<Sonnet />*/}


                    <div style={{ overflowY: "scroll",height:"35vh"}} >
                        <ButtonGroup vertical style={{width:"100%",backgroundColor:"transparent"}}>
                            <Button  onClick={() => this.props.handleAddEquipment(this.props.step,bunsun_burner)} style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                                <Equipment image={bunsun_burner} description={"Bunsun Burner"}/>


                            </Button>
                            <Button  onClick={() => this.props.handleAddEquipment(this.props.step,scale)} style={{color:"black",backgroundColor:"transparent",borderStyle:"solid",borderWidth:1,marginTop:5,marginBottom:5}}>
                                <Equipment image={scale} description={"Scale"}/>


                            </Button>



                        </ButtonGroup>
                    </div>
                </Tab>
            </Tabs>



        );
    }
}

export {EquipmentList};



